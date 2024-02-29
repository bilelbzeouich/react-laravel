<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories')

            ]

        ]);

        $category = new Category;
        $category->name = $validatedData['name'];


        $category->save();

        return response()->json(['message' => 'Category created successfully.']);
    }

    public function getCategoryName($id)
    {
        // Find the category by its ID
        $category = Category::findOrFail($id);

        // Retrieve the category name
        $categoryName = $category;

        // Return the category name as a JSON response
        return response()->json($categoryName);
    }
    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);


        if ($request->input('name') === null) {
            $category->name = $category->name;
        } else {
            $category->name = $request->input('name');
        }
        $category->save();
        return response()->json(['message' => 'Category updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
