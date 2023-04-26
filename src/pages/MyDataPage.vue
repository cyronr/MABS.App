<template>
    <my-profile activeTab="myData">
        <base-card>
            <h1>Moje dane</h1>
        </base-card>
    </my-profile>
</template>

<script>
import MyProfile from '../components/profiles/MyProfile.vue';

export default {
    components: {
        MyProfile
    }
}
</script>