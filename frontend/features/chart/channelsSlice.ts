import Channel from "Frontend/generated/com/example/application/data/entity/Channel";
import {RootState} from "Frontend/app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelEndPoint } from "Frontend/generated/endpoints";
import Enregistrer from "Frontend/generated/com/example/application/data/entity/Enregistrer";

export interface ChannelsState {
  enregistrers: Enregistrer[];
  channels: Channel[],

  selected?: Channel | null
  filterText: string
}

const initialState: ChannelsState = {
  channels: [],
  filterText: '',
  enregistrers: []
}

export const initFromServer = createAsyncThunk(
  'channels/initFromServer',
  async () => {
    return Promise.all([
      ChannelEndPoint.getChannels(),
    ]);
  }
)

export const saveChannel = createAsyncThunk(
  'channels/save',
  async (channel: Channel) => {
	    console.log(" Enregistrer id : " +channel.enregistrer?.id);
	  	return ChannelEndPoint.saveChannel(channel);
	  }
)

export const deleteChannel = createAsyncThunk(
  'channels/delete',
  async (channel: Channel) => {
    await ChannelEndPoint.deleteChannel(channel.id);
    return channel.id;
  }
)

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    selectChannel: (state, action: PayloadAction<Channel | null>) => {
      state.selected = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initFromServer.fulfilled, (state, action) => {
        const [channels] = action.payload;
        state.channels = channels;
      })
      .addCase(saveChannel.fulfilled, (state, action) => {
        const saved = action.payload;

        if (saved) {
          const channels = state.channels;
          const channelExists = channels.some((c) => c.id === saved.id);

          if (channelExists) {
            state.channels = channels.map((existing) => existing.id === saved.id ? saved : existing);
          } else {
            state.channels = [...channels, saved];
          }

          state.selected = null;
        }
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        const id = action.payload;
        state.channels = state.channels.filter(((c) => c.id !== id));
        state.selected = null;
      })
  }
})


// Selectors

export const getFilteredChannels = (state: RootState) => {
  const filter = new RegExp(state.channels.filterText, 'i');
  const channels = state.channels.channels;
  return channels.filter((channel) =>
    filter.test(`${channel.name} ${channel.way} ${channel.unit}`)
  );
}
export const getNumberOfChannels = (state: RootState) => state.channels.channels.length;

  


export const {updateFilter, selectChannel} = channelsSlice.actions
export const channelsReducer = channelsSlice.reducer

