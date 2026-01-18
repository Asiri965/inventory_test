<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    item: Object,
    transactions: Object,
});

function fmtQty(q) {
    if (q === null || q === undefined) return '';
    return Number(q).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    });
}

function fmtDate(d) {
    if (!d) return '';
    const dt = new Date(d);
    return dt.toLocaleString();
}

function badgeClass(type) {
    return type === 'add'
        ? 'bg-green-50 text-green-700 border-green-200'
        : 'bg-red-50 text-red-700 border-red-200';
}
</script>

<template>
    <Head title="Items" />
    <AuthenticatedLayout>
        <div class="min-h-screen">
            <div class="mx-auto max-w-6xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-3">
                            <Link
                                :href="`/items`"
                                class="text-sm text-gray-600 hover:text-gray-900"
                            >
                                ← Back
                            </Link>
                        </div>

                        <h1 class="mt-2 text-2xl font-semibold">
                            {{ item.name }}
                        </h1>
                        <p class="text-sm">
                            Unit: {{ item.unit }}
                        </p>
                    </div>

                    <div
                        class="rounded-2xl border border-gray-200 px-5 py-3 text-right shadow-sm"
                    >
                        <div class="text-xs text-gray-500">
                            Current Quantity
                        </div>
                        <div class="text-2xl font-semibold">
                            {{ fmtQty(item.quantity) }}
                        </div>
                    </div>
                </div>

                <div
                    class="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    <div class="border-b border-gray-200 px-4 py-3">
                        <h2 class="font-semibold text-gray-900">History</h2>
                        <p class="text-sm text-gray-600">
                            All additions and deductions for this item.
                        </p>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm">
                            <thead class="bg-gray-50 text-gray-700">
                                <tr>
                                    <th class="px-4 py-3 text-left">Type</th>
                                    <th class="px-4 py-3 text-right">
                                        Quantity
                                    </th>
                                    <th class="px-4 py-3 text-left">Note</th>
                                    <th class="px-4 py-3 text-left">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="t in transactions.data"
                                    :key="t.id"
                                    class="border-t border-gray-100"
                                >
                                    <td class="px-4 py-3">
                                        <span
                                            class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium"
                                            :class="badgeClass(t.type)"
                                        >
                                            {{ t.type }}
                                        </span>
                                    </td>

                                    <td
                                        class="px-4 py-3 text-right font-medium text-gray-900"
                                    >
                                        {{ fmtQty(t.quantity) }}
                                    </td>

                                    <td class="px-4 py-3 text-gray-700">
                                        {{ t.note || '—' }}
                                    </td>

                                    <td class="px-4 py-3 text-gray-600">
                                        {{ fmtDate(t.created_at) }}
                                    </td>
                                </tr>

                                <tr v-if="transactions.data.length === 0">
                                    <td
                                        colspan="4"
                                        class="px-4 py-10 text-center text-gray-600"
                                    >
                                        No history yet.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        v-if="transactions?.links?.length"
                        class="flex flex-wrap gap-2 border-t border-gray-200 px-4 py-3"
                    >
                        <Link
                            v-for="(l, idx) in transactions.links"
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
            </div>
        </div>
    </AuthenticatedLayout>
</template>
