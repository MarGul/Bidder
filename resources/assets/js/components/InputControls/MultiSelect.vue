<template>
    <div class="multi-select-container">
        
        <div class="multi-select-head" :class="{isOpen: open}" @click="open = !open">
            <div class="placeholder-text">
                {{ placeholder }}
                <span class="items-selected">( {{ itemsCount }} )</span>
            </div>
        </div>

        <div class="multi-dropdown-container" v-if="open" v-click-outside="close">
            <ul class="top-level-container" v-for="(item, index) in shadowItems" :key="item.slug">
                <li class="top-level-item">
                    <div class="level-item" :class="{'top-level': multiLevel}">
                        <i 
                            class="icon wh15 primary" 
                            :class="{'icon_checkbox_unchecked': !item.selected, 'icon_checkbox_checked': item.selected}"
                            @click="itemChecked(index, null)"
                        />
                        <span v-text="item.name"></span>
                    </div>
                    
                    <ul class="sub-level-container" v-if="multiLevel">
                        <li v-for="(subItem, subIndex) in item[multiKey]" :key="subItem.slug">
                            <div class="level-item sub-level">
                                <i 
                                    class="icon wh15 primary" 
                                    :class="{'icon_checkbox_unchecked': !subItem.selected, 'icon_checkbox_checked': subItem.selected}"
                                @click="itemChecked(index, subIndex)"
                                />
                                <span v-text="subItem.name"></span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            items: {
                type: Array,
                required: true
            },
            multiLevel: {
                type: Boolean,
                default: true
            },
            multiKey: {
                type: String
            }
        },
        data() {
            return {
                open: false,
                shadowItems: []
            }
        },
        watch: {
            items(newVal, oldVal) {
                this.buildShadowItems(newVal);
            }
        },
        computed: {
            itemsSelected() {
                let selected = [];

                this.shadowItems.forEach((item, index) => {
                    if ( !this.multiLevel ) {
                        if ( item.selected ) selected.push(item);
                    } else {
                        item[this.multiKey].forEach((subItem, index) => {
                            if ( subItem.selected ) selected.push(subItem);
                        });
                    }
                });

                return selected;
            },
            itemsCount() {
                return this.itemsSelected.length === 0 ? 'Alla' : this.itemsSelected.length;
            }
        },
        methods: {
            buildShadowItems(items) {
                this.shadowItems = items.map((item, index) => {
                    let shadowItem = {...item, selected: false};
                    
                    if ( this.multiLevel ) {
                        shadowItem[this.multiKey] = shadowItem[this.multiKey].map((subItem, index) => { 
                            return {...subItem, selected: false} 
                        });
                    }

                    return shadowItem;
                });
            },
            itemChecked(itemIndex, subIndex) {                
                if ( subIndex === null ) {
                    // If you are checking a top-level item.
                    this.shadowItems[itemIndex].selected = !this.shadowItems[itemIndex].selected;
                    let checked = this.shadowItems[itemIndex].selected;
                    
                    if ( this.multiLevel ) {
                        this.shadowItems[itemIndex][this.multiKey].forEach((item, index) => {
                            item.selected = checked ? true : false;
                        });
                    }
                } else {
                    // Checking a sub-level item.
                    let checked = !this.shadowItems[itemIndex][this.multiKey][subIndex].selected;
                    this.shadowItems[itemIndex][this.multiKey][subIndex].selected = checked;

                    if ( !checked ) {
                        // Haven't selected all of the top-levels items. So release the top level check.
                        this.shadowItems[itemIndex].selected = false;
                    }
                }

                // Let parent know about the selected items.
                this.$emit('changed', {items: this.itemsSelected});
            },
            close() {
                this.open = false;
            }
        },
        created() {
            this.buildShadowItems(this.items);
        }
    }
</script>

