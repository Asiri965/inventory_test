<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Item;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->get('search', ''));

        $items = Item::query()
            ->when($search !== '', fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Index', [
            'items' => $items,
            'filters' => ['search' => $search],
        ]);
    }

    public function show(Item $item)
    {
        $transactions = $item->transactions()
            ->latest('created_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Show', [
            'item' => $item,
            'transactions' => $transactions,
        ]);
    }
}
