
<!-- Form for following another user (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'FollowUserForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/followers?usernameOfFollowed=username1&usernameOfFollower=username2&add=true',
      method: 'PUT',
      hasBody: true,
      setFollowers:true,
      fields: [
      {id: 'usernameOfFollowed', label: 'Username of User to Follow', value: ''},
      {id: 'usernameOfFollower', label: 'Your Username', value: ''},
      {id: 'add', label: 'Action (Do not change)', value: 'true'}
      ],
      title: 'Follow Another User',
      callback: () => {
        const message = 'Successfully followed another user!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>