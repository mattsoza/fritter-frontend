<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main class="accountPage">
    <section class="accountPage">
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm class="changeusername" />
      <ChangePasswordForm class="changePass" />
    </section>
    <section class="accountPage">
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm class="logout" />
      <DeleteAccountForm class="deleteAccount" />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm
  }
};
</script>


<style>
main.accountPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.changeusername {
  background-color: #dedede;
}

.changePass {
  background-color: #dedede;
}

.logout {
  background-color: #dedede;
}

.deleteAccount {
  background-color: #E66567;
}

section.accountPage {
  display: flex;
  flex-direction: column;
  width: 50%;
}
</style>