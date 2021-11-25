<?php

	$list = array(
		"miked",
		"krysta",
		"testing"
	);

	$fp = fopen('./user.csv', 'w');
	fputcsv($fp, $list);
	fclose($fp);

?>