import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}
  // GET /podcasts
  // POST /podcasts
  // GET /podcasts/:id
  // PATCH /podcasts/:id
  // DELETE /podcasts/:id
  // GET /podcasts/:id/episodes
  // POST /podcasts/:id/episodes
  // PATCH /podcasts/:id/episodes/:episodeId
  // DELETE /podcasts/:id/episodes/:episodeId
  @Get()
  getAll() {
    return this.podcastsService.getAll();
  }

  @Post()
  createPodcast(@Body() podcastData) {
    return this.podcastsService.createPodcast(podcastData);
  }

  @Get('/:id')
  getOne(@Param('id') podcastId: string) {
    return this.podcastsService.getOne(podcastId);
  }

  @Patch('/:id')
  updatePodcast(@Param('id') podcastId: string, @Body() updateData) {
    return this.podcastsService.updatePodcast(podcastId, updateData);
  }

  @Delete('/:id')
  deletePodcast(@Param('id') podcastId: string) {
    return this.podcastsService.deletePodcast(podcastId);
  }

  @Get('/:id/episodes')
  getAllEpisode(@Param('id') podcastId: string) {
    return this.podcastsService.getAllEpisode(podcastId);
  }

  @Post('/:id/episodes')
  createEpisode(@Param('id') podcastId: string, @Body() episodeData) {
    return this.podcastsService.createEpisode(podcastId, episodeData);
  }

  @Patch('/:id/episodes/:episodeId')
  updateEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
    @Body() updateData,
  ) {
    return this.podcastsService.updateEpisode(podcastId, episodeId, updateData);
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
}
