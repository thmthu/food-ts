import { Container } from 'typedi';
import { DataSource } from 'typeorm';

export default async ({ ORMConnection, models }: { ORMConnection; models: { name: string; model: any }[] }) => {
    try {
        // Container.set(DataSource, ORMConnection)
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        console.log("Injecting successly!!!!")

    } catch (e) {
        console.log('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
}