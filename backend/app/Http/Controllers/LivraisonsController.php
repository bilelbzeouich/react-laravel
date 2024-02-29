<?php

namespace App\Http\Controllers;

use App\Models\livraisons;
use App\Http\Requests\StorelivraisonsRequest;
use App\Http\Requests\UpdatelivraisonsRequest;
use App\Models\emplacement;
use App\Models\produits;
use App\Models\rapprot;

class LivraisonsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = livraisons::with('category', 'emplacement', 'client', 'produits')->get();

        return response()->json($products);
    }





    public function indexref($ref)
    {
        $livraison = livraisons::with('category', 'emplacement', 'client', 'produits')->where('ref', $ref)->get();

        $livraison->each(function ($livraison) {
            $livraison->product = produits::find($livraison->product_id);
        });

        if ($livraison->isEmpty()) {
            return response()->json(['message' => 'Livraison not found'], 404);
        }

        return response()->json($livraison);
    }













    public function indexcl($ref)
    {
        $livraison = livraisons::with('category', 'emplacement', 'client', 'produits')->where('client_id', $ref)->get();

        if (!$livraison) {
            return response()->json(['message' => 'Livraison not found'], 404);
        }

        return response()->json($livraison);
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
    public function store(StorelivraisonsRequest $request)
    {
        $rows = $request->input('rows');
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $length = 10;
        $code = '';

        for ($i = 0; $i < $length; $i++) {
            $randomIndex = rand(0, strlen($characters) - 1);
            $code .= $characters[$randomIndex];
        }

        foreach ($rows as $row) {
            $client = $row['client'];
            $date = $row['date'];
            $selectedProduct = $row['selectedproduct'];
            $emplacementName_id = $row['emplacementName_id'];
            $categoryName_id = $row['categoryName_id'];
            $Qte = $row['Qte'];
            $prix = $row['prix'];

            $product = new livraisons();
            $product->emplacement_id = $emplacementName_id;
            $product->client_id = $client;
            $product->category_id =  $categoryName_id;
            $product->product_id = $selectedProduct;
            $product->qte =  $Qte;
            $product->prix =  $prix;
            $product->ref =  $code;
            $product->date_livraison =  $date;

            $rapport = new rapprot();
            $rapport->prix =  $prix;
            $rapport->product_id = $selectedProduct;
            $rapport->date_livraison =  $date;


            $emplacement = emplacement::find($emplacementName_id);
            $emplacement->capacite += $Qte;

            $produit = produits::find($selectedProduct);
            $produit->qte -= $Qte;
            if ($produit->qte < 0) {
                return response()->json(['message' => 'Insufficient quantité'], 400);
            }
            $emplacement->save();
            $produit->save();
            $product->save();
            $rapport->save();
        }

        return response()->json(['message' => 'Data saved successfully']);
    }









    /**
     * Display the specified resource.
     */
    public function show(livraisons $livraisons)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(livraisons $livraisons)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatelivraisonsRequest $request, livraisons $livraisons)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        do {
            $commande = livraisons::where('ref', $id)->first();

            if ($commande) {
                $commande->delete();
            }
        } while ($commande);
    }
}
