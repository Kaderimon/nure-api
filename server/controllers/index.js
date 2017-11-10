//work with db
import DataUpdater from '../services/dataupdater.js';

export async function refetchData() {
    await DataUpdater.run();
    console.log('contrl yeah');
}