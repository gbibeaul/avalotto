<script lang="ts">
  import { List, Button } from "smelte";
  import { stateStore } from "../stores/state";
  import { routing } from "../stores/routing";

  let bets;

  stateStore.subscribe((value) => {
    bets = value.bets;
  });

  let selected;
</script>

<main class="container">
  <section>
    <h3>Your tickets for this draw</h3>
    <div class="bets-list">
      <List bind:value={selected} items={bets} dense navigation>
        <li slot="item" let:item>
          <div>
            {item}
          </div>
        </li>
      </List>
    </div>
    <Button
      on:click={() => stateStore.updateBuying(true)}
      color="secondary"
      light
      block
      outlined>Buy other tickets</Button
    >
  </section>
</main>

<style>
  .bets-list {
    max-height: 88px;
    overflow-y: auto;
  }
  .container {
    padding: 16px;
  }
  section {
    padding: 14px 20px;
    background: rgba(30, 22, 68, 1);
    border-radius: 5px;
  }
  h3 {
    background: linear-gradient(111.32deg, #f8ac38 26.41%, #e68339 96.3%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.25rem;
  }
</style>
