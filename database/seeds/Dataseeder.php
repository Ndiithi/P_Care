<?php

use App\Catalog;
use App\Price;
use App\ProductGroup;
use App\Sale;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use League\Csv\Reader;
use League\Csv\Statement;

class Dataseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fileName = "salesmonthly.csv";
        $contents = Storage::disk('local')->get($fileName);
        Log::info("start importing");
        $csv = Reader::createFromString($contents);
        $csv->setHeaderOffset(0); //set the CSV header offset
        $stmt = Statement::create();
        $records = $stmt->process($csv);
        $data = array();

        array(
            'datum' => '12/15/2017',
            'M01AB' => '4.18',
            'M01AE' => '5.01',
            'N02BA' => '2.5',
            'N02BE' => '29',
            'N05B' => '6',
            'N05C' => '0',
            'R03' => '0',
            'R06' => '1',
            'Year' => '2017',
            'Month' => '12',
            'Hour' => '276',
            'Weekday Name' => 'Friday',
        );

        $data = array();
        $data2 = array();
        foreach ($records as $record) {
            $date = date_create($record['datum']);
            $purchaseDate = date_format($date, "Y-m-d H:i:s");
            array_push(
                $data,
                array('product_id' => 'M01AB', 'quantity' => $record['M01AB'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
                array('product_id' => 'M01AE', 'quantity' => $record['M01AE'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
                array('product_id' => 'N02BA', 'quantity' => $record['N02BA'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
                array('product_id' => 'N02BE', 'quantity' => $record['N02BE'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
                array('product_id' => 'N05B', 'quantity' => $record['N05B'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            );
            //seperate to have a smaller sql for inserts
            array_push(
                $data2,
                array('product_id' => 'N05C', 'quantity' => $record['N05C'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
                array('product_id' => 'R03', 'quantity' => $record['R03'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
                array('product_id' => 'R06', 'quantity' => $record['R06'], 'date_purchased' => $purchaseDate, 'batch_no' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime)
            );
        }
        $modelObj = new Sale();
        Sale::query()->truncate();
        $modelObj->insert($data);
        $modelObj->insert($data2);

        //import product groups
        $data = array(
            array('name' => 'M01AB', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'M01AE', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'N02BA', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'N02BE', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'N05B', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'N05C', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'R03', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'R06', 'created_at' => new \dateTime, 'updated_at' => new \dateTime)
        );

        $modelObj = new ProductGroup();
        ProductGroup::query()->truncate();
        $modelObj->insert($data);


        //import drug catalog
        $data = array(
            array('product_id' => 'M01AB', 'name' => 'M01AB', 'product_group_id' => 1, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'M01AE', 'name' => 'M01AE', 'product_group_id' => 2, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N02BA', 'name' => 'N02BA', 'product_group_id' => 3, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N02BE', 'name' => 'N02BE', 'product_group_id' => 4, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N05B', 'name' => 'N05B', 'product_group_id' => 5, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N05C', 'name' => 'N05C', 'product_group_id' => 6, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'R03', 'name' => 'R03', 'product_group_id' => 7, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'R06', 'name' => 'R06', 'product_group_id' => 8, 'manufacturer' => 'unknown', 'created_at' => new \dateTime, 'updated_at' => new \dateTime)
        );

        $modelObj = new Catalog();
        Catalog::query()->truncate();
        $modelObj->insert($data);

        //import prices

        //        protected $fillable = ['product_id', 'price', 'from_date', 'created_at', 'updated_at'];


        //import drug catalog
        $data = array(
            array('product_id' => 'M01AB', 'price' => 0, 'from_date' => new \dateTime, 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'M01AE', 'price' => 0, 'from_date' => new \dateTime,  'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N02BA', 'price' => 0, 'from_date' => new \dateTime,  'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N02BE', 'price' => 0, 'from_date' => new \dateTime, 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N05B', 'price' => 0, 'from_date' => new \dateTime, 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'N05C', 'price' => 0, 'from_date' => new \dateTime, 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'R03', 'price' => 0, 'from_date' => new \dateTime, 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('product_id' => 'R06', 'price' => 0, 'from_date' => new \dateTime, 'created_at' => new \dateTime, 'updated_at' => new \dateTime)
        );

        $modelObj = new Price();
        Price::query()->truncate();
        $modelObj->insert($data);
    }
}
