import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entites/episode.entity';
import { Podcast } from './entites/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = []; //fake database

  getAll(): Podcast[] {
    return this.podcasts; //query will replace this later!!
  }

  createPodcast(podcastData) {
    if (podcastData.episodes) {
      this.podcasts.push({
        id: this.podcasts.length + 1,
        ...podcastData,
      });
    }
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...podcastData,
      episodes: [],
    }); // if data have no episode will get error in createEpisode
  }

  getOne(id: string): Podcast {
    const podcast = this.podcasts.find(
      (podcast) => podcast.id === parseInt(id),
    );
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID ${id} not found.`);
    }
    return podcast;
  }

  deletePodcast(id: string) {
    this.getOne(id);
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== +id);
  }

  updatePodcast(id: string, updateData) {
    const podcast = this.getOne(id);
    this.deletePodcast(id);
    this.podcasts.push({ ...podcast, ...updateData });
  }

  getAllEpisode(id: string): Episode[] {
    return this.getOne(id).episodes;
  }

  createEpisode(id: string, episodeData) {
    const podcast = this.getOne(id);
    podcast.episodes.push({
      id: podcast.episodes.length + 1,
      ...episodeData,
    });
  }

  deleteEpisode(id: string, episodeId: string) {
    const podcast = this.getOne(id);
    //get podcast
    const newEpisodes = podcast.episodes.filter(
      (episode) => episode.id !== parseInt(episodeId),
    );
    // filter out target episode
    this.updatePodcast(id, { episodes: newEpisodes });
    //update the podcast with new episodes[]
  }
  updateEpisode(id: string, episodeId: string, updateData) {
    const episode = this.getOne(id).episodes.find(
      (episode) => episode.id === parseInt(episodeId),
    );
    //get episode
    this.deleteEpisode(id, episodeId);
    //del target episode
    this.updatePodcast(id, {
      episodes: [...this.getOne(id).episodes, { ...episode, ...updateData }],
    });
    //update podcast with new episodes[]
  }
}
