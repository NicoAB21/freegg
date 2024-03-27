import { api } from '../api'

export const getAllGames = async () => {
  return api.get('/games').then((response) => {
    return response.data
  })
}

export const getAllGamesAndPlatform = async (platform: { platform: string }) => {
  return api.get(`/games?platform=${platform}`).then((response) => {
    return response.data
  })
}

export const getGameByID = async (id: { id: number }) => {
  console.log('ID is', id)
  return api.get(`/game?id=${id.id}`).then((response) => {
    return response.data
  })
}

export const getGameByCategorie = async (categorie: { categorie: string }) => {
  console.log('Categorie is', categorie)
  return api.get(`/games?category=${categorie}`).then((response) => {
    return response.data
  })
}

export const getGameByCategorieAndPlatform = async (categorie: any, platform: any) => {
  console.log('Categorie is', categorie)
  return api.get(`/games?category=${categorie}&platform=${platform}`).then((response) => {
    return response.data
  })
}
