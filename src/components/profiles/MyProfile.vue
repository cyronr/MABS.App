<template>
    <base-page class="pagemain">
        <div class="page">
            <div class="menu">
                <base-card vertical>
                    <ul>
                        <li :class="{active: activeTab == 'myData'}">Moje dane</li>
                        <li> <hr /> </li> 
                        <li>Moje wizyty</li>
                        <li> <hr /> </li> 
                        <li>Moje dane</li>
                        <li> <hr /> </li> 
                        <li class="delete-profile">Usuń konto</li>
                    </ul>
                </base-card>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </base-page>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.page {
  display: flex;
}

.menu {
  margin-right: 2rem;
  min-width: 12rem;
  position: sticky;
}

.content {
   flex-grow: 1;  
}

.menu ul {
    list-style: none;
    padding: 0.5rem;
}

.menu ul li {
    font-size: 1.2rem;
    padding: 0.5rem;
    margin: 0.2rem 0.3rem;
    cursor: pointer;
    text-align: center;
}

.menu ul li hr {
    border-top: 1px solid #ccc;
    width: 95%;
    margin: 0;
}

.menu ul li:hover,
.menu ul li.active {
  font-weight: bolder;
}

.delete-profile {
    color: #e00000;
    margin-top: 15rem;
}

</style>