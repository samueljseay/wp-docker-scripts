docker run -it --rm \
  --volumes-from docker-wp_wordpress_1 \
  --network container:docker-wp_wordpress_1 \
  wordpress:cli core install --url="localhost:1234" --title="Woo Dev Environment" \
  --admin_user="admin" --admin_password="password" \
  --admin_email="admin@example.com"