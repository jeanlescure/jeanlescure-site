<?php
if( mail('jeanmlescure@gmail.com', 'test subject', 'hello this is a test') ){
    echo 'Mail was sent';
} else {
    echo 'Couldn\'t send the mail';
}
?>
