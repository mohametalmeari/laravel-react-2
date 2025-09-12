<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Color;
use League\CommonMark\Extension\CommonMark\Node\Inline\Code;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::all();
            return ProductResource::collection($products);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        try {
            $data = $request->validated();
            $product = Product::create($data);
            if ($request->has('colors')) {
                $colorIds = [];
                foreach ($request->colors as $color) {
                    $colorIds[] = Color::firstOrCreate(
                        ['name' => $color['name'], 'hex_code' => $color['hex_code']]
                    )->id;
                }
                $product->colors()->sync($colorIds);
            }
            return ProductResource::make($product);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            return ProductResource::make($product);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $data = $request->validated();
            $product->update($data);
            if ($request->has('colors')) {
                $colorIds = [];
                foreach ($request->colors as $color) {
                    $colorIds[] = Color::firstOrCreate(
                        ['name' => $color['name'], 'hex_code' => $color['hex_code']]
                    )->id;
                }
                $product->colors()->sync($colorIds);
            }
            return ProductResource::make($product);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();
            return response()->json("", 204);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
}
