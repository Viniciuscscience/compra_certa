<?php

require_once("Rest.inc.php");

class API extends REST {

    public $data = "";
//fake data for our db , i dont know if we wil need a db ... anyway, it's here
    const DB_SERVER = "127.0.0.1";
    const DB_USER = "compracerta";
    const DB_PASSWORD = "compracerta";
    const DB = "compracerta_db";

    private $db = NULL;
    private $mysqli = NULL;

    public function __construct() {
        parent::__construct();    // Init parent contructor
        $this->dbConnect();     // Initiate Database connection
    }

    /*
     *  Connect to Database
     */

    private function dbConnect() {
        $this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
    }

    /*
     * Dynmically call the method based on the query string
     */

    public function processApi() {
        $func = strtolower(trim(str_replace("/", "", $_REQUEST['x'])));
        if ((int) method_exists($this, $func) > 0)
            $this->$func();
        else
            $this->response('', 404); // If the method not exist with in this class "Page not found".
    }
    
    private function inUse(){
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        
        $id = (int) $this->_request['id'];
        
        $date = date("Y-m-d");
        $hour = date("G:i:s");
        $week = date("D");
        
        if($week=='Mon')
            $days=0;
        else if($week == 'Tue')
            $days=1;
        else if($week == 'Wed')
            $days=2;
        else if($week == 'Thu')
            $days=3;
        else if($week == 'Fri')
            $days=4;
        else if($week == 'Sat')
            $days=5;
        else if($week == 'Sun'){
             $this->response('', 204); // If no records "No Content" status
        }
        
        $query = "SELECT * FROM alloc where roomId='".$id
                . "' AND beginDate<='".$date
                . "' AND endDate>='".$date
                . "' AND beginHour<='".$hour
                . "' AND endHour>='".$hour."'";
       
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                if($row['days'][$days]==1){
                    $result = $row;
                    break;
                }
            }
            if(!empty($result)){
                $this->response($this->json($result), 200); // send user details
            }
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
    private function room() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $id = $this->_request['id'];
        $query = "SELECT * FROM rooms where id =".$id;
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $result = $row;
                break;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
    
    private function pack() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $id = $this->_request['id'];
        $query = "SELECT * FROM blocks where id =".$id;
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $result = $row;
                break;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    private function users(){
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        $query = "SELECT  * FROM users";
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
    private function allRooms() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        $query = "SELECT * FROM rooms order by choosedPack";
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
    private function deleteAllocation() {
        if ($this->get_request_method() != "DELETE") {
            $this->response('', 406);
        }
        $id = (int) $this->_request['id'];
        if ($id > 0) {
            $query = "DELETE FROM alloc WHERE id =".$id;
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Successfully deleted one record.");
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); // If no records "No Content" status
    }
    
    private function roomsWith(){
        
        $daysBlocked = false;
        $hourBlocked = false;
        $dateBlocked = false;
        $again=false;
         if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $pack = $this->_request['choosedPack'];
        $pne = $this->_request['pne'];
        $type = $this->_request['type'];
        $beginDate = $this->_request['beginDate'];
        $endDate = $this->_request['endDate'];
        $beginHour = $this->_request['beginHour'];
        $endHour = $this->_request['endHour'];
        $days = $this->_request['days'];
        
        $query = "SELECT * FROM rooms WHERE choosedPack=".$pack." AND pne=".$pne." AND lab=".$type;
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
             $inIns = 0;
             $inDel = 0;
                $alreadInsert = array();
               
                $deleteds = array();
            while ($row = $r->fetch_assoc()) {
             
                $query = "SELECT * FROM alloc WHERE roomId=".$row['id'];
                
                $s = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
                if($s->num_rows >0){
                    while ($row2 = $s->fetch_assoc()) {
                        
                        for($ind=0; $ind < 6; $ind++){
                            if(($row2['days'][$ind] == $days[$ind]) && $days[$ind]==1)
                                $daysBlocked=true; 
                        }                        
                        if(($row2['beginDate'] <= $beginDate && $beginDate <= $row2['endDate']) || ($row2['endDate'] >= $endDate && $endDate >= $row2['beginDate'])){
                           $dateBlocked = true;
                        }
                        if(($row2['beginHour'] <= $beginHour && $beginHour <= $row2['endHour']) || ($row2['endHour'] >= $endHour && $endHour >= $row2['beginHour']))
                           $hourBlocked = true;
                   
                      
                        if(!($daysBlocked && $dateBlocked && $hourBlocked)){
                            if((!in_array($row,$alreadInsert)) && (!in_array($row,$deleteds)))
                                $alreadInsert[$inIns++] = $row;
                        }else if(!in_array($row,$deleteds))
                                $deleteds[$inDel++] =  $row;

                        $daysBlocked = false;
                        $hourBlocked = false;
                        $dateBlocked = false;
                        $again = false;
                        
                    }
                }else{
                    $result[]=$row;
                } 
            }
       
            foreach($alreadInsert as $shouldInsert){
                if(!in_array($shouldInsert, $deleteds))
                        $result[]=$shouldInsert;
                    
            }
            $this->response($this->json($result), 200); // send user details
        }
        else{
        $this->response('', 204); // If no records "No Content" status
        }
    }
    
     private function allocations() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $room = $this->_request['room'];
        $query = "SELECT * FROM alloc where roomId=".$room;
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
     private function rooms() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $pack = $this->_request['pack'];
        $query = "SELECT * FROM rooms where choosedPack=".$pack;
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $row['usando'] = false;
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
     private function blocks() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $query = "SELECT distinct c.id, c.name FROM blocks c order by c.name desc";
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }

    private function login() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        }
         $user = json_decode(file_get_contents("php://input"), true);
      
        
        $email = $user['name'];
        $password = $user['password'];
        if (!empty($email) and ! empty($password)) {
                $query = "SELECT id, name, email, role FROM users WHERE email = '$email' AND password = '" . $password . "' LIMIT 1";
                $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

                if ($r->num_rows > 0) {
                    $result = $r->fetch_assoc();
                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }
                $this->response('', 401); // If no records "No Content" status
            
        }

        $error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
        $this->response($this->json($error), 400);
    }

    private function customers() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $query = "SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM angularcode_customers c order by c.customerNumber desc";
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();
            while ($row = $r->fetch_assoc()) {
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }

    private function customer() {
        if ($this->get_request_method() != "GET") {
            $this->response('', 406);
        }
        $id = (int) $this->_request['id'];
        if ($id > 0) {
            $query = "SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM angularcode_customers c where c.customerNumber=$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            if ($r->num_rows > 0) {
                $result = $r->fetch_assoc();
                $this->response($this->json($result), 200); // send user details
            }
        }
        $this->response('', 204); // If no records "No Content" status
    }

    private function insertRoom() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        }
        $room = json_decode(file_get_contents("php://input"), true);
        $column_names = array('name', 'choosedPack', 'pne','lab', 'capacity');
        $keys = array_keys($room);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If blank insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $room[$desired_key];
            }
            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }
        $query = "INSERT INTO rooms(" . trim($columns, ',') . ") VALUES(" . trim($values, ',') . ")";
        if (!empty($room)) {
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Room Created Successfully.", "data" => $room);
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); //"No Content" status
    }
    
    private function allocRoom() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        } 
        $room = json_decode(file_get_contents("php://input"), true);
        $column_names = array('roomId', 'teacher', 'classNumber','course', 'beginDate', 'beginHour', 'endDate', 'endHour','days');
        $keys = array_keys($room);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If blank insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $room[$desired_key];
            }
            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }
        $query = "INSERT INTO alloc(" . trim($columns, ',') . ") VALUES(" . trim($values, ',') . ")";
        if (!empty($room)) {
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Alloc Created Successfully.", "data" => $room);
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); //"No Content" status
    }

    
    
    
    private function insertUser() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        }
        $user = json_decode(file_get_contents("php://input"), true);
        $column_names = array('name', 'email', 'password', 'role');
        $keys = array_keys($user);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If blank insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $user[$desired_key];
            }
            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }
        $query = "INSERT INTO users(" . trim($columns, ',') . ") VALUES(" . trim($values, ',') . ")";
        if (!empty($user)) {
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "User Created Successfully.", "data" => $user);
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); //"No Content" status
    }

    private function insertPack() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        }
   
        $pack = json_decode(file_get_contents("php://input"), true);
        $column_names = array('name');
        $keys = array_keys($pack);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If blank insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $pack[$desired_key];
            }
            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }
        $query = "INSERT INTO blocks(" . trim($columns, ',') . ") VALUES(" . trim($values, ',') . ")";
        if (!empty($pack)) {
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Pack Created Successfully.", "data" => $pack);
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); //"No Content" status
    }
    
    private function updateCustomer() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        }
        $customer = json_decode(file_get_contents("php://input"), true);
        $id = (int) $customer['id'];
        $column_names = array('customerName', 'email', 'city', 'address', 'country');
        $keys = array_keys($customer['customer']);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If key does not exist, insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $customer['customer'][$desired_key];
            }
            $columns = $columns . $desired_key . "='" . $$desired_key . "',";
        }
        $query = "UPDATE angularcode_customers SET " . trim($columns, ',') . " WHERE customerNumber=$id";
        if (!empty($customer)) {
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Customer " . $id . " Updated Successfully.", "data" => $customer);
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); // "No Content" status
    }

    private function updateRoom() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        }
        $room = json_decode(file_get_contents("php://input"), true);
        
        $id = (int) $room['id'];
        $column_names = array('name', 'choosedPack', 'pne', 'lab', 'capacity');
        $keys = array_keys($room['room']);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If key does not exist, insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $room['room'][$desired_key];
            }
            $columns = $columns . $desired_key . "='" . $$desired_key . "',";
        }
        $query = "UPDATE rooms SET " . trim($columns, ',') . " WHERE id=".$id;
        if (!empty($room)) {
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Room " . $id . " Updated Successfully.", "data" => $room);
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); // "No Content" status
    }


    private function updatePack() {
        if ($this->get_request_method() != "POST") {
            $this->response('', 406);
        }
        $pack = json_decode(file_get_contents("php://input"), true);
        
        $id = (int) $pack['id'];
        $column_names = array('name');
        $keys = array_keys($pack['pack']);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If key does not exist, insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $pack['pack'][$desired_key];
            }
            $columns = $columns . $desired_key . "='" . $$desired_key . "',";
        }
        $query = "UPDATE blocks SET " . trim($columns, ',') . " WHERE id=".$id;
        if (!empty($pack)) {
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Pack " . $id . " Updated Successfully.", "data" => $pack);
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); // "No Content" status
    }

    
    private function deleteCustomer() {
        if ($this->get_request_method() != "DELETE") {
            $this->response('', 406);
        }
        $id = (int) $this->_request['id'];
        if ($id > 0) {
            $query = "DELETE FROM angularcode_customers WHERE customerNumber = $id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
            $success = array('status' => "Success", "msg" => "Successfully deleted one record.");
            $this->response($this->json($success), 200);
        } else
            $this->response('', 204); // If no records "No Content" status
    }

    /*
     * 	Encode array into JSON
     */

    private function json($data) {
        if (is_array($data)) {
            return json_encode($data);
        }
    }

}

// Initiiate Library

$api = new API;
$api->processApi();
?>