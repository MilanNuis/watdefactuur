<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pro\Products\StoreValidation;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Auth::user()->products()->orderBy('created_at', 'desc')->paginate(25);
        return Inertia::render('Pro/Products/Index', compact('products'));
    }

    public function store(StoreValidation $request)
    {
        Auth::user()->products()->create([
            'name' => $request->validated('name'),
            'description' => $request->validated('description'),
            'price_without_btw' => $request->validated('price_without_btw'),
            'price_with_btw' => $request->validated('price_with_btw'),  
            'btw' => $request->validated('btw'),
        ]);

        return redirect()->route('pro.dashboard.products.index')->with('success', "Product succesvol aangemaakt!");
    }

    public function update(StoreValidation $request, Product $product)
    {
        $product->update([
            'name' => $request->validated('name'),
            'description' => $request->validated('description'),
            'price_without_btw' => $request->validated('price_without_btw'),
            'price_with_btw' => $request->validated('price_with_btw'),  
            'btw' => $request->validated('btw'),
        ]);

        return redirect()->route('pro.dashboard.products.index')->with('success', "Product succesvol bijgewerkt!");
    }
}
