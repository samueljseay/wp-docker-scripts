export $(egrep -v '^#' .env | xargs)

# example multi line command
# cat <<EOF | docker exec --interactive boring_hawking sh
# cd /var/log
# tar -cv ./file.log
# EOF

