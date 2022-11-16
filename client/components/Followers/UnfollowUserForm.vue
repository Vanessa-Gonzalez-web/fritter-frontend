
<!-- Form for unfollowing another user (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'UnfollowUserForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/followers?usernameOfFollowed=username1&usernameOfFollower=username2&add=false',
      method: 'PUT',
      hasBody: true,
      setFollowers:true,
      fields: [
      {id: 'usernameOfFollowed', label: 'Username of User to Unfollow', value: ''},
      {id: 'usernameOfFollower', label: 'Your Username', value: ''},
      {id: 'add', label: 'Action (Do not change)', value: 'false'}
      ],
      title: 'Unfollow Another User',
      callback: () => {
        const message = 'Successfully ufollowed another user!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>