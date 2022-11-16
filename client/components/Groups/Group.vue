<!-- Page for a user's profile view -->
<!-- User should be authenticated in order to see this page -->

<template>
    <main>
      <section>
        <header>
          <h2>Group Members</h2>
        </header>
        <article>
            <h2>Group Management</h2>
            <AddMemberForm />
            <RemoveMemberForm />
            <AddAdminForm />
            <RemoveAdminForm />
        </article>
        <article>
            <h2>Get Group Information</h2>
            <GetGroupInformationForm />
        </article>
      </section>
    </main>
  </template>
  
  <script>
  import AddMemberForm from '@/components/Groups/AddGroupMember.vue';
  import RemoveMemberForm from '@/components/Groups/RemoveGroupMember.vue';
  import AddAdminForm from '@/components/Groups/AddAdmin.vue';
  import RemoveAdminForm from '@/components/Groups/RemoveAdmin.vue';
  import GetGroupInformationForm from '@/components/Groups/GetGroupInformation.vue';
  export default {
    name: 'GroupPage',
    components: {
        AddMemberForm,
        RemoveMemberForm,
        AddAdminForm,
        RemoveAdminForm,
        GetGroupInformationForm
    }
  };
  </script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>

