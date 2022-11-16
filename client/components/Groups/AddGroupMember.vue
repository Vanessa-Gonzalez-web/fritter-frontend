<!-- Form for adding a member to a group (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddMemberForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/groupTagging?groupUsername=username1&addedGroupMemberUsername=username2&action=addMember',
      method: 'PUT',
      hasBody: true,
      fields: [
      {id: 'groupUsername', label: 'Group Username', value: ''},
      {id: 'addedGroupMemberUsername', label: 'New Member Username', value: ''},
      {id: 'action', label: 'Action (Do not change)', value: 'addMember'}
      ],
      title: 'Add New Member',
      callback: () => {
        const message = 'Successfully added member!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>