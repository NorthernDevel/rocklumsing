<template>
  <section>
    <AppLaunching />
  </section>

  <section>
    <div class="flex flex-col">
      <div class="flex justify-center px-2 py-4 mt-8">
        <AppGameNav :links="navStore.menuGames" />
      </div>
      <AppDownload />

      <div class="w-full p-2 md:p-4">
        <div class="game-block">
          <section>
            <AppGameBar
              src="/assets/images/menus/hot-game.webp"
              :name="hotgame"
            />
            <AppGameList
              :is-loading="loaderStore.isLoading"
              :games-list="recommendList"
              first-large
              is-provider
            />
          </section>
        </div>
      </div>
    </div>
  </section>

  <section>
    <AppShowcase />
  </section>
</template>
<script setup lang="ts">
const { t } = useI18n()
import { GameType } from '~/models/default.model'
import type { GamesList } from '~/models/games.model'

const resourceStore = useResourceStore()
const navStore = useNavStore()
const gameStore = useGameStore()
const loaderStore = useLoaderStore()
const popupStore = usePopupStore()
const { origin } = useBestUrl()

const hotgame = t('game_hotgame')

useSeoMeta({
  title: 'Home Page',
  description: 'This is the home Page',
  ogTitle: () => resourceStore.infoSetting.title.th ?? 'AMBGOGO',
  ogDescription: () => resourceStore.seoMeta.description,
  keywords: () => resourceStore.seoMeta.keywords,
  ogImage: '/assets/images/logo.webp',
  ogUrl: () => origin,
  twitterTitle: () => resourceStore.infoSetting.title.th ?? 'AMBGOGO',
  twitterDescription: () => resourceStore.seoMeta.description,
  twitterImage: '/assets/images/logo.webp',
  twitterCard: 'summary',
})

const recommendList = ref<GamesList[]>([])

const fetchGamesListByType = async (gameType: GameType) => {
  try {
    loaderStore.start()
    const { status, gamesList, message } = await useGamesListByType(gameType)
    if (!status) {
      popupStore.toastError({ message })
    } else {
      const gamesData = gamesList ? gamesList : []
      if (gameType == GameType['SLOT']) {
        const slotRecommendList = [
          'PMTS',
          'PGS',
          'DRG',
          'MGS',
          'AMBS',
          'RECG',
          'JOK',
          'SMP',
        ]
        const filteredSlots = gamesData.filter((slot) =>
          slotRecommendList.includes(slot.productCode),
        )
        recommendList.value.push(...filteredSlots)
      } else if (gameType === GameType['LIVE']) {
        const casinoRecommendList = [
          'PTG',
          'WM',
          'SAG',
          'MTV',
          'PTGC',
        ]
        const filteredCasinos = gamesList.filter((casino) =>
          casinoRecommendList.includes(casino.productCode),
        )
        recommendList.value.push(...filteredCasinos)
      } else {
        recommendList.value.push(...gamesData)
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.log((e as Error).message)
  } finally {
    loaderStore.stop()
  }
}

onMounted(async () => {
  await fetchGamesListByType(GameType['SLOT'])
  await fetchGamesListByType(GameType['LIVE'])
})
</script>

<style scoped>
.col-width {
  width: 50%;
}

@media (min-width: 1024px) {
  .col-width {
    width: calc(33.3333% - 20px);
  }
}
</style>
