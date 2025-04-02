import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function MyLocationInput() {
    const [address, setAddress] = useState('');

    const handleSelect = async (val) => {
        try {
            const results = await geocodeByAddress(val);
            const { lat, lng } = await getLatLng(results[0]);
            console.log('Coordinates: ', lat, lng);
            setAddress(val);
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={(val) => setAddress(val)}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, idx) => {
                            const style = {
                                backgroundColor: suggestion.active ? '#fafafa' : '#ffffff',
                                cursor: 'pointer',
                                padding: '8px',
                            };
                            return (
                                <div
                                    key={idx}
                                    {...getSuggestionItemProps(suggestion, { style })}
                                >
                                    {suggestion.description}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}

export default MyLocationInput;
