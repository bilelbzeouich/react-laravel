<?php

namespace App\Http\Controllers;

use App\Models\stockpv;
use App\Http\Requests\StorestockpvRequest;
use App\Http\Requests\UpdatestockpvRequest;
use App\Models\Category;
use App\Models\emplacement;
use App\Models\emplacementpv;
use App\Models\produits;

class StockpvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $stockpv = stockpv::where('pv_id', $id)->get();
        $responseData = [];

        foreach ($stockpv as $stock) {
            $produit = produits::where('id', $stock->product_id)->first();
            $category = Category::where('id', $produit->category_id)->first();
            $emplacement = emplacementpv::where('id', $stock->emplacementpv_id)->first();
            $data = [
                'count' => $stock,
                'category' => $category,
                'produit' => $produit,
                'emplacement' => $emplacement
            ];
            $responseData[] = $data;
        }

        return response()->json($responseData);
    }
    public function indexnqte($id)
    {
        $stockpv = stockpv::where('pv_id', $id)->get();
        $responseData = [];
        $today = date('Y-m-d');
        foreach ($stockpv as $stock) {
            $produit = produits::where('id', $stock->product_id)
                ->whereRaw("DATEDIFF(date_expiration, '$today') < 30")
                ->first();
            $category = Category::where('id', $produit->category_id)->first();
            $emplacement = emplacementpv::where('id', $stock->emplacementpv_id)->first();
            $data = [
                'count' => $stock,
                'category' => $category,
                'produit' => $produit,
                'emplacement' => $emplacement
            ];
            $responseData[] = $data;
        }

        return response()->json($responseData);
    }
    public function indexnotif($id)
    {
        $stockpv = stockpv::where('pv_id', $id)
            ->where('qte', '<', 10)
            ->get();
        $responseData = [];

        foreach ($stockpv as $stock) {
            $produit = produits::where('id', $stock->product_id)->first();
            $category = Category::where('id', $produit->category_id)->first();
            $emplacement = emplacementpv::where('id', $stock->emplacementpv_id)->first();
            $data = [
                'count' => $stock,
                'category' => $category,
                'produit' => $produit,
                'emplacement' => $emplacement
            ];
            $responseData[] = $data;
        }

        return response()->json($responseData);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorestockpvRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(stockpv $stockpv)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(stockpv $stockpv)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatestockpvRequest $request, stockpv $stockpv)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(stockpv $stockpv)
    {
        //
    }
}
