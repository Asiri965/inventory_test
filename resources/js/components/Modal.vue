<script setup>
const props = defineProps({
    show: { type: Boolean, default: false },
    maxWidth: { type: String, default: '2xl' },
});

const emit = defineEmits(['close']);

const close = () => emit('close');

const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
}[props.maxWidth];
</script>

<template>
    <teleport to="body">
        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="show"
                class="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div class="fixed inset-0 bg-black/50" @click="close"></div>

                <div
                    class="relative mx-4 w-full overflow-hidden rounded-2xl bg-white shadow-xl"
                    :class="['sm:mx-0', maxWidthClass]"
                >
                    <div class="p-5">
                        <slot />
                    </div>

                    <div class="flex justify-end gap-2 px-5 pb-5">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
