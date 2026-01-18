<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import AuthenticatedLayout from '@/layouts/AppLayout.vue';
import { add, deduct } from '@/routes/inventory';
import { index } from '@/routes/items';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    items: Object,
    filters: Object,
});

const search = ref(props.filters?.search ?? '');
let searchTimer: ReturnType<typeof setTimeout> | null = null;

watch(search, (val) => {
    if (searchTimer) {
        clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
        router.get(
            index().url,
            { search: val },
            { preserveState: true, replace: true },
        );
    }, 300);
});

// ---------- Bulk Add ----------
const showAdd = ref(false);

const addForm = useForm({
    lines: [{ name: '', unit: 'unit', quantity: '', note: '' }],
});

function addLineAdd() {
    addForm.lines.push({ name: '', unit: 'unit', quantity: '', note: '' });
}
function removeLineAdd(idx: number) {
    if (addForm.lines.length === 1) return;
    addForm.lines.splice(idx, 1);
}
function openAdd() {
    addForm.clearErrors();
    showAdd.value = true;
}
function submitAdd() {
    addForm.post(add().url, {
        preserveScroll: true,
        onSuccess: () => {
            showAdd.value = false;
            addForm.reset();
            addForm.lines = [
                { name: '', unit: 'unit', quantity: '', note: '' },
            ];
        },
    });
}

// ---------- Bulk Deduct ----------
const showDeduct = ref(false);

const itemsList = computed(() => props.items?.data ?? []);

const deductForm = useForm({
    lines: [{ item_id: '', quantity: '', note: '' }],
});

function addLineDeduct() {
    deductForm.lines.push({ item_id: '', quantity: '', note: '' });
}
function removeLineDeduct(idx: number) {
    if (deductForm.lines.length === 1) return;
    deductForm.lines.splice(idx, 1);
}
function openDeduct() {
    deductForm.clearErrors();
    showDeduct.value = true;
}
function submitDeduct() {
    deductForm.post(deduct().url, {
        preserveScroll: true,
        onSuccess: () => {
            showDeduct.value = false;
            deductForm.reset();
            deductForm.lines = [{ item_id: '', quantity: '', note: '' }];
        },
    });
}

function fmtQty(q: number | null | undefined): string {
    if (q === null || q === undefined) return '';
    return Number(q).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    });
}
</script>

<template>
    <Head title="Items" />
    <AuthenticatedLayout>
        <div class="min-h-screen">
            <div class="mx-auto max-w-6xl p-6">
                <div
                    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <h1 class="text-2xl font-semibold">Inventory</h1>
                        <p class="text-sm text-gray-600">
                            Search items, update stock, and view history.
                        </p>
                    </div>

                    <div class="flex gap-2">
                        <button
                            class="rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
                            @click="openAdd"
                        >
                            + Add Stock
                        </button>
                        <button
                            class="rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50"
                            @click="openDeduct"
                        >
                            − Deduct Stock
                        </button>
                    </div>
                </div>

                <div
                    class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div class="relative w-full sm:max-w-md">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Search by item name…"
                            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none"
                        />
                    </div>

                    <div class="text-sm text-gray-600">
                        Total:
                        <span class="font-medium">
                            {{ props.items?.total ?? 0 }}</span
                        >
                    </div>
                </div>

                <div
                    class="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm">
                            <thead class="bg-gray-50 text-gray-700">
                                <tr>
                                    <th class="px-4 py-3 text-left">Item</th>
                                    <th class="px-4 py-3 text-left">Unit</th>
                                    <th class="px-4 py-3 text-right">
                                        Quantity
                                    </th>
                                    <th class="px-4 py-3 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="item in itemsList"
                                    :key="item.id"
                                    class="border-t border-gray-100 hover:bg-gray-50"
                                >
                                    <td class="px-4 py-3">
                                        <Link
                                            :href="`items/${item.id}`"
                                            class="font-medium text-gray-900 hover:underline"
                                        >
                                            {{ item.name }}
                                        </Link>
                                    </td>
                                    <td class="px-4 py-3 text-gray-700">
                                        {{ item.unit }}
                                    </td>
                                    <td
                                        class="px-4 py-3 text-right font-medium text-gray-900"
                                    >
                                        {{ fmtQty(item.quantity) }}
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <Link
                                            :href="`items/${item.id}`"
                                            class="rounded-lg border border-gray-300 px-3 py-1.5 text-gray-900 hover:bg-white"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>

                                <tr v-if="itemsList.length === 0">
                                    <td
                                        colspan="4"
                                        class="px-4 py-10 text-center text-gray-600"
                                    >
                                        No items found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination (simple) -->
                    <div
                        v-if="props.items?.links?.length"
                        class="flex flex-wrap gap-2 border-t border-gray-200 px-4 py-3"
                    >
                        <Link
                            v-for="(l, idx) in props.items.links"
                            :key="idx"
                            :href="l.url || ''"
                            class="rounded-lg border px-3 py-1.5 text-sm"
                            :class="[
                                l.active
                                    ? 'border-gray-900 bg-gray-900 text-white'
                                    : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                !l.url ? 'pointer-events-none opacity-50' : '',
                            ]"
                            v-html="l.label"
                        />
                    </div>
                </div>

                <!-- ADD MODAL -->
                <Modal :show="showAdd" maxWidth="3xl" @close="showAdd = false">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">
                                Add Stock
                            </h2>
                            <p class="text-sm text-gray-600">
                                Add one or many items at once.
                            </p>
                        </div>
                        <button
                            class="text-gray-500 hover:text-gray-900"
                            @click="showAdd = false"
                        >
                            ✕
                        </button>
                    </div>

                    <div class="mt-4 space-y-3">
                        <div
                            v-if="addForm.hasErrors"
                            class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                        >
                            Please fix the errors and try again.
                        </div>

                        <div
                            class="overflow-x-auto rounded-xl border border-gray-200"
                        >
                            <table class="min-w-full text-sm">
                                <thead class="bg-gray-700 text-white">
                                    <tr>
                                        <th class="px-3 py-2 text-left">
                                            Name
                                        </th>
                                        <th class="px-3 py-2 text-left">
                                            Unit
                                        </th>
                                        <th class="px-3 py-2 text-left">Qty</th>
                                        <th class="px-3 py-2 text-left">
                                            Note
                                        </th>
                                        <th class="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(line, idx) in addForm.lines"
                                        :key="idx"
                                        class="border-t border-gray-100"
                                    >
                                        <td class="w-[28%] px-3 py-2">
                                            <input
                                                v-model="line.name"
                                                type="text"
                                                placeholder="e.g. Cement"
                                                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
                                            />
                                        </td>
                                        <td class="w-[14%] px-3 py-2">
                                            <select
                                                v-model="line.unit"
                                                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
                                            >
                                                <option value="unit">
                                                    unit
                                                </option>
                                                <option value="kg">kg</option>
                                                <option value="cm">cm</option>
                                                <option value="m">m</option>
                                                <option value="l">l</option>
                                            </select>
                                        </td>
                                        <td class="w-[14%] px-3 py-2">
                                            <input
                                                v-model="line.quantity"
                                                type="number"
                                                step="0.001"
                                                min="0"
                                                placeholder="0"
                                                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
                                            />
                                        </td>
                                        <td class="px-3 py-2">
                                            <input
                                                v-model="line.note"
                                                type="text"
                                                placeholder="Optional"
                                                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
                                            />
                                        </td>
                                        <td class="px-3 py-2 text-right">
                                            <button
                                                class="rounded-lg border border-gray-300 bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                                                @click="removeLineAdd(idx)"
                                                type="button"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <button
                            type="button"
                            class="rounded-xl border border-gray-300 bg-black px-4 py-2 text-white hover:bg-gray-800"
                            @click="addLineAdd"
                        >
                            + Add row
                        </button>
                    </div>

                    <template #footer>
                        <button
                            class="hove:pointer- rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50"
                            type="button"
                            @click="showAdd = false"
                        >
                            Cancel
                        </button>
                        <button
                            class="rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
                            type="button"
                            :disabled="addForm.processing"
                            @click="submitAdd"
                        >
                            {{ addForm.processing ? 'Saving...' : 'Save' }}
                        </button>
                    </template>
                </Modal>

                <!-- DEDUCT MODAL -->
                <Modal
                    :show="showDeduct"
                    maxWidth="3xl"
                    @close="showDeduct = false"
                >
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">
                                Deduct Stock
                            </h2>
                            <p class="text-sm text-gray-600">
                                Deduct one or many items at once.
                            </p>
                        </div>
                        <button
                            class="text-gray-500 hover:text-gray-900"
                            @click="showDeduct = false"
                        >
                            ✕
                        </button>
                    </div>

                    <div class="mt-4 space-y-3">
                        <div
                            v-if="deductForm.hasErrors"
                            class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                        >
                            Please fix the errors and try again.
                        </div>

                        <div
                            class="overflow-x-auto rounded-xl border border-gray-200"
                        >
                            <table class="min-w-full text-sm">
                                <thead class="bg-gray-700 text-white">
                                    <tr>
                                        <th class="px-3 py-2 text-left">
                                            Item
                                        </th>
                                        <th class="px-3 py-2 text-left">Qty</th>
                                        <th class="px-3 py-2 text-left">
                                            Note
                                        </th>
                                        <th class="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(line, idx) in deductForm.lines"
                                        :key="idx"
                                        class="border-t border-gray-100"
                                    >
                                        <td class="w-[40%] px-3 py-2">
                                            <select
                                                v-model="line.item_id"
                                                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
                                            >
                                                <option value="" disabled>
                                                    Select item
                                                </option>
                                                <option
                                                    v-for="it in itemsList"
                                                    :key="it.id"
                                                    :value="it.id"
                                                >
                                                    {{ it.name }} ({{
                                                        it.unit
                                                    }}) —
                                                    {{ fmtQty(it.quantity) }}
                                                </option>
                                            </select>
                                        </td>
                                        <td class="w-[18%] px-3 py-2">
                                            <input
                                                v-model="line.quantity"
                                                type="number"
                                                step="0.001"
                                                min="0"
                                                placeholder="0"
                                                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
                                            />
                                        </td>
                                        <td class="px-3 py-2">
                                            <input
                                                v-model="line.note"
                                                type="text"
                                                placeholder="Optional"
                                                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
                                            />
                                        </td>
                                        <td class="px-3 py-2 text-right">
                                            <button
                                                class="rounded-lg border text-white border-gray-300 bg-red-500 px-3 py-2 hover:bg-red-600"
                                                @click="removeLineDeduct(idx)"
                                                type="button"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <button
                            type="button"
                            class="rounded-xl border border-gray-300 bg-black px-4 py-2 text-white hover:bg-gray-800"
                            @click="addLineDeduct"
                        >
                            + Add row
                        </button>
                    </div>

                    <template #footer>
                        <button
                            class="rounded-xl border text-white border-gray-300 bg-red-600 px-4 py-2 hover:bg-red-700"
                            type="button"
                            @click="showDeduct = false"
                        >
                            Cancel
                        </button>
                        <button
                            class="rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
                            type="button"
                            :disabled="deductForm.processing"
                            @click="submitDeduct"
                        >
                            {{ deductForm.processing ? 'Saving...' : 'Save' }}
                        </button>
                    </template>
                </Modal>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
