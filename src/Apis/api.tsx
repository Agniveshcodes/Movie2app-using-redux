import axios from "axios";
import { Show } from "../Models/show";

export async function fecthShows(keyWoard: string) {
  const response = await axios.get<{ show: Show }[]>(
    "https://api.tvmaze.com/search/shows?q=" + keyWoard
  );

  return response.data.map((items) => items.show);
}

export async function fecthShowsDetail(showId: number) {
  const response = await axios.get("https://api.tvmaze.com/shows/" + showId);

  return response.data;
}

export function fetchCast(showId: number) {
  return axios
    .get(`https://api.tvmaze.com/shows/${showId}/cast`)
    .then((res) => {
      return res.data.map((items: any) => {
        return items.person;
      });
    });
}

export async function fetchCast2(showId: number) {
  const response = await axios.get(
    `https://api.tvmaze.com/shows/${showId}/cast`
  );

  return response.data.map((items: any) => {
    return items.person;
  });
}
export async function getCast(show: Show) {
  const response = await axios.get(
    `https://api.tvmaze.com/shows/${show.id}/cast`
  );

  const cast = response.data.map((items: any) => {
    return items.person;
  });

  return { cast, show };
}

export async function gedCastAndShows(keyWoard: string) {
  const response = await axios.get<{ show: Show }[]>(
    "https://api.tvmaze.com/search/shows?q=" + keyWoard
  );

  const shows = response.data.map((items) => items.show);
  const allPromises = [];

  for (let index = 0; index < shows.length; index++) {
    const element = shows[index];

    allPromises.push(getCast(element))
  }

  return Promise.all(allPromises)
}
