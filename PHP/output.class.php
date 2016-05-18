<?php

interface view {
	public function setXY( $x , $y );
	public function openWrap();
	public function closeWrap();
	public function renderObjDump( $stateArray );
}

abstract class outputFile implements view {
	protected $f = null;
	protected $sep = '';
	protected $default_sep = "\n";
	protected $ext = '';
	protected $widht = 0;
	protected $height = 0;

	public function __construct( $fileName , $width , $height  )
	{
		if( !is_string($fileName) )
		{
			// throw
		}
		else
		{
			if( !is_numeric($width) || !is_numeric($height) )
			{
				// throw
			}
			$fileName .= '.'.$this->ext;
			if( !file_exists($fileName) )
			{
				$dir = dirname($fileName);
				if( !is_dir($dir) || !is_writable($dir) ) {
					// throw
				}
			}
			$this->f = fopen($fileName,'w+');
		}
	}

	public function setXY( $x , $y )
	{
		fwrite($this->f, "{$this->sep}$x,$y");
		$this->sep = $this->default_sep;
	}

}





// ========================================================






class outputSVG extends outputFile {

	protected $default_sep = ' ';
	protected $ext = 'svg';


	public function __construct($fileName , $width , $height )
	{
		parent::__construct( $fileName , $width , $height );

		if( !is_numeric($width) || !is_numeric($height) )
		{
			// throw
		}

		fwrite($this->f, '<?xml version="1.0"?>
<svg width="'.$width.'" height="'.$height.'" viewPort="0 0 '.$width.' '.$height.'" version="1.1" xmlns="http://www.w3.org/2000/svg">

');
	}


	public function renderObjDump( $stateArray ) {
		if( !is_array($stateArray) )
		{
			// throw
		}

		fwrite($this->f, "\n\n<!--\n".json_encode($stateArray)."\n-->\n\n");
	}


	public function openWrap()
	{
		fwrite($this->f, "\n\n\n\t<polyline fill=\"none\" stroke=\"black\" points=\"");
	}


	public function closeWrap()
	{
		fwrite($this->f, "\" />\n\n");
	}


	public function __destruct()
	{
		fwrite($this->f, '
</svg>');
		fclose($this->f);
	}
}





// ========================================================






class outputJSON extends outputFile {

	protected $default_sep = ' ';
	protected $ext = 'json';


	public function __construct($fileName , $width , $height)
	{
		parent::__construct( $fileName , $width , $height );

		if( !is_numeric($width) || !is_numeric($height) )
		{
			// throw
		}

		fwrite($this->f, '{
	"width": '.$width.',
	"height": '.$height.',');
	}



	public function openWrap()
	{
		fwrite($this->f, ",\n\"points\": [");
	}


	public function closeWrap()
	{
		fwrite($this->f, "\n]");
	}


	public function renderObjDump( $stateArray )
	{
		if( !is_array($stateArray) )
		{
			// throw
		}

		fwrite($this->f, ",\n\"MD3state\": " . json_encode($stateArray));
	}


	public function __destruct()
	{
		fwrite($this->f, '
}');
		fclose($this->f);
	}
}