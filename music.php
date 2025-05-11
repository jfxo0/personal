<?php
$myAudioFile = "myAudiofile.wav";
echo '<audio autoplay="true" style="display:none;">
         <source src="'.$myAudioFile.'" type="audio/wav">
      </audio>';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Website</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<?php include 'includes/header.php'; ?>

<div class="container">
    <h1>Welcome to My Music Website</h1>
<!--    <ul class="song-list">-->
<!--        --><?php
//        $songs = scandir('songs');
//        foreach ($songs as $song) {
//            if ($song !== '.' && $song !== '..') {
//                echo "<li><a href='songs/$song' target='_blank'>$song</a></li>";
//            }
//        }
//        ?>
<!--    </ul>-->

</div>
</body>
</html>

