<?php

namespace App\Http\Controllers;

use App\Models\facturation;
use App\Http\Requests\StorefacturationRequest;
use App\Http\Requests\UpdatefacturationRequest;
use App\Models\Category;
use App\Models\emplacementpv;
use App\Models\produits;
use App\Models\stockpv;

class FacturationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $stockpv = facturation::where('pv_id', $id)->get();
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
    public function store(StorefacturationRequest $request)
    {
        $rows = $request->input('rows');

        foreach ($rows as $row) {
            $client = $row['client'];
            $date = $row['date'];
            $selectedProduct = $row['selectedproduct'];
            $emplacementName_id = $row['emplacementName_id'];
            $categoryName_id = $row['categoryName_id'];
            $Qte = $row['Qte'];
            $pv_id = $row['pv_id'];

            $product = new facturation();
            $product->emplacementpv_id = $emplacementName_id;
            $product->clientpv_id = $client;
            $product->category_id =  $categoryName_id;
            $product->stockpvs_id = $selectedProduct;
            $product->qte =  $Qte;
            $product->date_livraison =  $date;
            $product->pv_id =  $pv_id;


            $emplacement = emplacementpv::find($emplacementName_id);
            $emplacement->capacite += $Qte;

            $produit = stockpv::find($selectedProduct);

            if ($produit->qte < 0) {
                return response()->json(['message' => 'Insufficient quantité'], 400);
            }
            $emplacement->save();
            $product->save();
        }

        return response()->json(['message' => 'Data saved successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(facturation $facturation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(facturation $facturation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatefacturationRequest $request, facturation $facturation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(facturation $facturation)
    {
        //
    }
}
