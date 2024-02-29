<?php

namespace App\Http\Controllers;

use App\Models\produits;
use App\Http\Requests\StoreproduitsRequest;
use App\Http\Requests\UpdateproduitsRequest;
use App\Models\Category;
use App\Models\emplacement;
use App\Models\fornissuer;
use App\Models\stockpv;

class ProduitsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = produits::with('category', 'emplacement', 'fornissuer')->get();

        return response()->json($products);
    }


    public function indexfr($id)
    {
        $products = produits::with('category', 'emplacement', 'fornissuer')->where('fornissuer_id', $id)->get();

        return response()->json($products);
    }


    public function notif()
    {
        $products = produits::with('category', 'emplacement', 'fornissuer')
            ->where('qte', '<', 10)
            ->get();

        return response()->json($products);
    }
    public function notifdate()
    {
        $today = date('Y-m-d'); // Get the current date

        $products = produits::whereRaw("DATEDIFF(date_expiration, '$today') < 30")
            ->get();

        return response()->json($products);
    }

    public function indexpv($id)
    {
        $count = stockpv::where('pv_id', $id)->first();
        $products = produits::findOrFail($count->product_id);


        return response()->json($products);
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
    public function store(StoreproduitsRequest $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required',
            'category_id' => 'required',
            'image' => 'required|image|max:2048',
            'qte' => 'required|numeric',
            'description' => 'required',
            'emplacement_id' => 'required',
            'fornissuers_id' => 'required',
            'date_expiration' => 'required',
            'code_produit' => 'required',
            'prix' => 'required',

        ]);

        // Process and store the image
        $image = $request->file('image');
        $imagePath = $image->store('product_images', 'public');

        // Create the product
        $product = new produits();
        $product->nom = $validatedData['nom'];
        $product->category_id = $validatedData['category_id'];
        $product->image = $imagePath;
        $product->qte = $validatedData['qte'];
        $product->description = $validatedData['description'];
        $product->code_produit = $validatedData['code_produit'];
        $product->date_expiration = $validatedData['date_expiration'];
        $product->emplacement_id = $validatedData['emplacement_id'];
        $product->fornissuer_id = $validatedData['fornissuers_id'];
        $product->prix = $validatedData['prix'];

        $emplacement = emplacement::find($validatedData['emplacement_id']);
        $emplacement->capacite -= $validatedData['qte'];
        if ($emplacement->capacite < 0) {
            return response()->json(['message' => 'Insufficient capacity'], 400);
        }
        $emplacement->save();

        $product->save();

        return response()->json(['message' => 'Product added successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(produits $produits)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(produits $produits)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function productName($id)
    {
        // Find the category by its ID
        $product = produits::findOrFail($id);

        // Retrieve the category name
        $productName = $product;

        // Return the category name as a JSON response
        return response()->json($productName);
    }
    public function update(UpdateproduitsRequest $request, $id)
    {

        $product = produits::findOrFail($id);

        if ($request->input('name') === null) {
            $product->nom = $product->nom;
        } else {
            $product->nom = $request->input('name');
        }
        if ($request->input('category_id') === null) {
            $product->category_id = $product->category_id;
        } else {
            $product->category_id = $request->input('category_id');
        }
        if ($request->input('emplacment_id') === null) {
            $product->emplacement_id = $product->emplacement_id;
            $emplacement = emplacement::find($product->emplacement_id);
        } else {
            $product->emplacement_id = $request->input('emplacment_id');
            $emplacement = emplacement::find($request->input('emplacment_id'));
        }
        if ($request->input(' fornisseur_id') === null) {
            $product->fornissuer_id = $product->fornissuer_id;
        } else {
            $product->fornissuer_id = $request->input(' fornisseur_id');
        }
        if ($request->input('quantity') === null) {
            $product->qte = $product->qte;
        } else {
            $product->qte = $request->input('quantity');

            if ($product->qte < $request->input('quantity')) {
                $emplacement->capacite -= $request->input('quantity');
                if ($emplacement->capacite < 0) {
                    return response()->json(['message' => 'Insufficient capacity'], 400);
                }
            } else {
                $emplacement->capacite = $emplacement->capacite + ($product->qte - $request->input('quantity'));
            }

            $emplacement->save();
        }
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('product_images', 'public');
            $product->image = $imagePath;
        }

        if ($request->input('description') === null) {
            $product->description = $product->description;
        } else {
            $product->description = $request->input('description');
        }
        if ($request->input('date') === null) {
            $product->date_expiration = $product->date_expiration;
        } else {
            $product->date_expiration = $request->input('date');
        }



        $product->save();
    }

    // Fetch the category name based on the selected product from the database
    public function getCategoryName($id)
    {
        $product = Produits::findOrFail($id);
        $category = Category::findOrFail($product->category_id);
        $categoryName = $category;

        $emplacement = Emplacement::findOrFail($product->emplacement_id);
        $emplacementName = $emplacement;



        return response()->json(['categoryName' => $categoryName, 'emplacementName' => $emplacementName, 'product' => $product]);
    }
    public function getCategoryNamepv($id)
    {
        $product = Produits::findOrFail($id);
        $category = Category::findOrFail($product->category_id);
        $categoryName = $category;

        $emplacement = Emplacement::findOrFail($product->emplacement_id);
        $emplacementName = $emplacement;

        $fornissuer = fornissuer::findOrFail($product->emplacement_id);
        $fornissuerName = $fornissuer;

        return response()->json(['categoryName' => $categoryName, 'emplacementName' => $emplacementName, 'fornissuerName' => $fornissuerName]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $produit = produits::findOrFail($id);

        $emplacement = $produit->emplacement;
        $emplacement->capacite += $produit->qte;
        $emplacement->save();

        $produit->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
