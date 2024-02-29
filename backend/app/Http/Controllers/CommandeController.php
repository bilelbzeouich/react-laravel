<?php

namespace App\Http\Controllers;

use App\Models\commande;
use App\Http\Requests\StorecommandeRequest;
use App\Http\Requests\UpdatecommandeRequest;
use App\Models\cartepv;
use App\Models\Category;
use App\Models\emplacement;
use App\Models\emplacementpv;
use App\Models\produits;
use App\Models\stockpv;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $count = commande::where('pv_id', $id)->get();

        if ($count) {
            return response()->json($count);
        } else {
            return response()->json(null);
        }
    }
    public function   commandeview($id)
    {
        $count = commande::where('name', $id)->get();

        if ($count) {
            return response()->json($count);
        } else {
            return response()->json(null);
        }
    }
    public function  commandeviews()
    {
        $client = commande::all();
        return response()->json($client);
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
    public function store(StorecommandeRequest $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'quantity' => 'required|numeric',
            'phone' => 'required',
            'address' => 'required',
            'product_title' => 'required',
            'pv_id' => 'required',
            'image' => 'required|max:2048',
            'product_id' => 'required',
            'price' => 'required',
            'emplacementpv_id' => 'required',
            'delivery_status' => 'required',



        ]);




        // Create the product
        $product = new commande();
        $product->name = $validatedData['name'];
        $product->image = $validatedData['image'];
        $product->phone = $validatedData['phone'];
        $product->email = $validatedData['email'];
        $product->address = $validatedData['address'];
        $product->product_title = $validatedData['product_title'];
        $product->price = $validatedData['price'];
        $product->quantity = $validatedData['quantity'];
        $product->product_id = $validatedData['product_id'];
        $product->pv_id = $validatedData['pv_id'];
        $product->emplacementpv_id = $validatedData['emplacementpv_id'];
        $product->delivery_status = $validatedData['delivery_status'];



        $product->save();
        $count = cartepv::where('pv_id', $validatedData['pv_id'])->count();
        if ($count > 0) {
            $cartepv = cartepv::where('pv_id', $validatedData['pv_id'])->first();
            $cartepv->delete();
        }
        return response()->json(['message' => 'Product added successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(commande $commande)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(commande $commande)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecommandeRequest $request, $id)
    {
        $commandes = Commande::where('name', $id)->get();

        foreach ($commandes as $commande) {
            $commande->delivery_status = "verifié";
            $stock = new stockpv();
            $verif = stockpv::where('product_id', $commande->product_id)->first();
            if ($verif) {
                $verif->qte += $commande->quantity;
                $verif->save();
            } else {
                $stock->qte = $commande->quantity;
                $stock->pv_id = $commande->pv_id;
                $stock->product_id = $commande->product_id;
                $stock->emplacementpv_id = $commande->emplacementpv_id;
                $produit = produits::where('id', $commande->product_id)->first();
                $category = Category::where('id', $produit->category_id)->first();
                $stock->category = $category->id;
                $stock->save();
            }

            $emplacementpv = emplacementpv::find($commande->emplacementpv_id);
            $emplacementpv->capacite -= $commande->quantity;
            if ($emplacementpv->capacite < 0) {
                return response()->json(['message' => 'Insufficient capacity'], 400);
            }
            $product = produits::where('id', $commande->product_id)->first();
            $emplacement = emplacement::find($product->emplacement_id);
            $emplacement->capacite += $commande->quantity;
            $product->qte -= $commande->quantity;
            if ($product->qte < 0) {
                return response()->json(['message' => 'Insufficient disponibilite'], 400);
            }
            $emplacement->save();
            $product->save();
            $emplacementpv->save();

            $commande->save();
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        do {
            $commande = Commande::where('name', $id)->first();

            if ($commande) {
                $commande->delete();
            }
        } while ($commande);
    }
}
