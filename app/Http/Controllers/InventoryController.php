<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inventory\StoreAdditionRequest;
use App\Http\Requests\Inventory\StoreDeductionRequest;
use App\Services\InventoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function __construct(private InventoryService $inventory) {}

    public function add(StoreAdditionRequest $request): RedirectResponse
    {
        $this->inventory->add($request->validated()['lines']);
        return back()->with('success', 'Items added successfully.');
    }

    public function deduct(StoreDeductionRequest $request): RedirectResponse
    {
        $this->inventory->deduct($request->validated()['lines']);
        return back()->with('success', 'Items deducted successfully.');
    }
}
