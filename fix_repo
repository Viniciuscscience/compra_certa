#!/bin/sh

git filter-branch --env-filter '

am="$GIT_AUTHOR_EMAIL"
cm="$GIT_COMMITTER_EMAIL"

if [ "$GIT_COMMITTER_EMAIL" = "none@none" ]
then
    cm="kadishmal@gmail.com"
fi
if [ "$GIT_AUTHOR_EMAIL" = "none@none" ]
then
    am="kadishmal@gmail.com"
fi

export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_EMAIL="$cm"
'
