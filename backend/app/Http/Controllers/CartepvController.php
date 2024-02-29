<?php

namespace App\Http\Controllers;

use App\Models\cartepv;
use App\Http\Requests\StorecartepvRequest;
use App\Http\Requests\UpdatecartepvRequest;

class CartepvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $count = cartepv::where('pv_id', $id)->get();

        if ($count) {
            return response()->json($count);
        } else {
            return response()->json(null);
        }
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
    public function store(StorecartepvRequest $request)
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


        ]);




        // Create the product
        $product = new cartepv();
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



        $product->save();

        return response()->json(['message' => 'Product added successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(cartepv $cartepv)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cartepv $cartepv)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecartepvRequest $request, cartepv $cartepv)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = cartepv::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'client deleted successfully.']);
    }
}
