<template>
    <div class="pagination">
        <base-button :disabled="!prevPageButtonEnabled" :class="{disabled: !prevPageButtonEnabled}" @click="goToPage(currentPage - 1)">Poprzednia</base-button>
        <ul>
            <li v-for="page in prevPages" :key="page" @click="goToPage(page)"> {{ page }} </li>
        </ul>
        <span>{{ currentPage }}</span>
        <ul>
            <li v-for="page in nextPages" :key="page" @click="goToPage(page)"> {{ page }} </li>
        </ul>
        <base-button :disabled="!nextPageButtonEnabled" :class="{ disabled: !nextPageButtonEnabled }" @click="goToPage(currentPage + 1)">Następna</base-button>
    </div>
</template>
  
<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        totalCount: {
            type: Number,
            required: true
        }
    },
    computed: {
        prevPages() {
            const pages = [];
            for(let i=1; i < this.currentPage; i++) {
                pages.push(i);
            }

            return pages;
        },
        nextPages() {
            const pages = [];
            for(let i=this.currentPage+1; i <= this.totalPages; i++) {
                pages.push(i);
            }

            return pages;
        },
        prevPageButtonEnabled() {
            return this.currentPage !== 1;
        },
        nextPageButtonEnabled() {
            return this.currentPage !== this.totalPages;
        }
    },
    methods: {
        goToPage(pageNumber) {
            this.$emit("page-changed", pageNumber);
        }
    }
};
</script>
  
<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #5c6bc0;
    border: 1px solid #5c6bc0;
    color: #fff;
    cursor: pointer;
    min-width: 110px;
}

.pagination button:hover,
.pagination button:active {
    background-color: #4d599c;
    border-color: #4d599c;
}

.pagination span {
    margin: 0 1rem;
    font-size: 1.25rem;
    font-weight: bold;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin: 0 5px;
}

li:hover {
    cursor: pointer;
    text-decoration: underline;
    font-size: 1.1rem;
    font-weight: bolder;
}

.disabled {
    background-color: #bbb !important;
    border-color: #bbb !important; 
    cursor: default !important;
}
</style>