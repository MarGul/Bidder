<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	
	<form action="" method="POST" enctype="multipart/form-data">
		{{ csrf_field() }}

		<input type="file" name="media[]" multiple id="">

		<input type="submit" value="Skicka">
	</form>

</body>
</html>