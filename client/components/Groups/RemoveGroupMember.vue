<!-- Form for removing a member from a group (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RemoveMemberForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/groupTagging?groupUsername=username1&removedGroupMemberUsername=username2&action=removeMember',
      method: 'PUT',
      hasBody: true,
      fields: [
      {id: 'groupUsername', label: 'Group Username', value: ''},
      {id: 'removedGroupMemberUsername', label: 'Removed Member Username', value: ''},
      {id: 'action', label: 'Action (Do not change)', value: 'removeMember'}
      ],
      title: 'Remove a Member',
      callback: () => {
        const message = 'Successfully removed member!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>