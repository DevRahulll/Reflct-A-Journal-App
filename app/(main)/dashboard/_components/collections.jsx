"use client"

import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import { createCollection, getCollections } from "@/actions/collection";



const Collections = ({ collections = [], entriesByCollection }) => {
    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false)

    const {
        loading: createCollectionLoading,
        data: createdCollection,
        fn: createCollectionFn
    } = useFetch(createCollection);

    const {
        fn: fetchCollections,
    } = useFetch(getCollections)

    useEffect(() => {
        if (createCollection) {
            setIsCollectionDialogOpen(false);
            fetchCollections(); // refreshes collection list
            toast.success(`Collection created!`);
        }

    }, [createdCollection, createCollectionLoading])

    const handleCreationCollection = async (data) => {
        createCollectionFn(data);
    }

    if (collections.length === 0) return <></>;

    return (
        <section className="space-y-6" id="collections">
            <h2 className="text-3xl font-bold gradient-title">Collections</h2>
            <div className="grid gap-6 md:grids-cols-2 lg:grid-cols-3">
                {/* new Collections Button */}
                <CollectionPreview
                    isCreatedNew={true}
                    onCreateNew={() => setIsCollectionDialogOpen(true)}
                />

                {/* Unorganzied collections */}
                {entriesByCollection?.unorganized?.length > 0 && (
                    <CollectionPreview
                        name="Unorganized"
                        entries={entriesByCollection.unorganized}
                        isUnorganized={true}
                    />
                )}

                {/* User collections */}
                {collections?.map((collection) => (
                    <CollectionPreview
                        key={collection.id}
                        id={collection.id}
                        name={collection.name}
                        entries={entriesByCollection[collection.id] || []}
                    />
                ))}

                <CollectionForm
                    loading={createCollectionLoading}
                    onSuccess={handleCreationCollection}
                    open={isCollectionDialogOpen}
                    setOpen={setIsCollectionDialogOpen}
                />
            </div>
        </section>
    );
};

export default Collections;