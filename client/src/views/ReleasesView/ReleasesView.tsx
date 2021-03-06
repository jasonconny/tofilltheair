import * as React from 'react';
import { useParams } from 'react-router-dom';
import { PrimaryLayout } from 'components/Layouts';
import SubNav from 'components/Layouts/SubNav';

const SubNavLinks: Array<INavLink> = [
    {
        name: 'Box Set',
        slug: 'box-set'
    },
    {
        name: 'Dick\'s Picks',
        slug: 'dicks-picks'
    },
    {
        name: 'Download Series',
        slug: 'download-series'
    },
    {
        name: 'Road Trips',
        slug: 'road-trips'
    },
    {
        name: 'Dave\'s Picks',
        slug: 'daves-picks'
    }
];

const ReleasesView: React.FC = () => {
    const { releaseType }: {releaseType: string} = useParams();

    return (
        <PrimaryLayout subNav={<SubNav links={SubNavLinks}/>}>
            <section>
                <h2>Releases</h2>

                {releaseType && (
                    <h3>{SubNavLinks.find(link => link.slug === releaseType)?.name}</h3>
                )}
            </section>
        </PrimaryLayout>
    );
};

export default ReleasesView;
