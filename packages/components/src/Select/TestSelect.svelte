<script type="ts">
    import SelectOption from '../SelectOption/SelectOption.svelte';
    import Select from './Select.svelte';

    export let slotValue = '';
</script>

<Select {...$$restProps}>
    <SelectOption value={slotValue}>{slotValue}</SelectOption>
</Select>
