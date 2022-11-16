<!-- Page for a user's profile view -->
<!-- User should be authenticated in order to see this page -->

<template>
    <main>
      <section>
        <header>
          <h2>Contact Information Display Management</h2>
        </header>
        <CreateContactInformationForm />
        <UpdateContactInformationForm/>
        <article>
            <h2>Find Contact Information of User</h2>
        </article>
        <GetContactInformationForm />
        <article>
            <h2>Follow User</h2>
            <FollowUserForm />
        </article>
        <article>
            <h2>Unfollow User</h2>
            <UnfollowUserForm />
        </article>
      </section>
      <section>
        <header>
            <section>
                <div class="left">
                    <h2>
                        Followers
                    </h2>
                    <section
                        v-if="$store.state.followers.length"
                    >
                        <div v-for="follower in $store.state.followers">
                            {{follower}}
                        </div>
                    </section>
                    <article
                        v-else
                    >
                        <h3>No Followers found.</h3>
                    </article>
                </div>
            </section>
            <section>
                <div class="right">
                    <h2>
                        Following
                    </h2>
                    <section
                        v-if="$store.state.following.length"
                    >
                        <div v-for="following in $store.state.following">
                            {{following}}
                        </div>
                    </section>
                    <article
                        v-else
                    >
                        <h3>No Following found.</h3>
                    </article>
                </div>
            </section>
        </header>
        </section>
    </main>
  </template>
  
  <script>
  import CreateContactInformationForm from '@/components/contactInformationDisplay/CreateContactInformationDisplayForm.vue';
  import UpdateContactInformationForm from '@/components/contactInformationDisplay/UpdateContactInformationDisplayForm.vue';
  import GetContactInformationForm from '@/components/contactInformationDisplay/DisplayContactInformation.vue';
  import FollowUserForm from '@/components/Followers/FollowUsersForm.vue';
  import UnfollowUserForm from '@/components/Followers/UnfollowUserForm.vue';
  
  export default {
    name: 'ProfilePage',
    components: {
      CreateContactInformationForm,
      UpdateContactInformationForm,
      GetContactInformationForm,
      FollowUserForm,
      UnfollowUserForm
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

