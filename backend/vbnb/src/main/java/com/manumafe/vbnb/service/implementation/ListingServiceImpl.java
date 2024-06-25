package com.manumafe.vbnb.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.dto.mapper.ListingDtoMapper;
import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.entity.Image;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CategoryRepository;
import com.manumafe.vbnb.repository.CharacteristicRepository;
import com.manumafe.vbnb.repository.CityRepository;
import com.manumafe.vbnb.repository.ImageRepository;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.service.ListingService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListingServiceImpl implements ListingService {

	private final ListingRepository listingRepository;
	private final CityRepository cityRepository;
	private final CategoryRepository categoryRepository;
	private final CharacteristicRepository characteristicRepository;
	private final ImageRepository imageRepository;
	private final ListingDtoMapper listingDtoMapper;

	@Override
	@Transactional
	public ListingResponseDto saveListing(ListingCreateDto listingDto) {
		City city = cityRepository.findById(listingDto.cityId())
				.orElseThrow(
						() -> new ResourceNotFoundException("City with id: " + listingDto.cityId() + " not found"));

		Category category = categoryRepository.findById(listingDto.categoryId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Category with id: " + listingDto.categoryId() + " not found"));

		Listing listing = new Listing();

		listing.setTitle(listingDto.title());
		listing.setDescription(listingDto.description());
		listing.setCategory(category);
		listing.setCity(city);

		Set<Characteristic> characteristics = getCharacteristics(listingDto.characteristicIds(), listing);
		listing.setCharacteristics(characteristics);

		Set<Image> images = getImages(listingDto.images(), listing);
		listing.setImages(images);

		listingRepository.save(listing);
		return listingDtoMapper.toResponseDto(listing);
	}

	@Override
	public void deleteListing(Long id) {
		listingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + id + " not found"));

		listingRepository.deleteById(id);
	}

	@Override
	@Transactional
	public ListingResponseDto updateListing(Long id, ListingCreateDto listingDto) {
		Listing listing = listingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + id + " not found"));

		City city = cityRepository.findById(listingDto.cityId())
				.orElseThrow(
						() -> new ResourceNotFoundException("City with id: " + listingDto.cityId() + " not found"));

		Category category = categoryRepository.findById(listingDto.categoryId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Category with id: " + listingDto.categoryId() + " not found"));

		listing.setTitle(listingDto.title());
		listing.setDescription(listingDto.description());
		listing.setCategory(category);
		listing.setCity(city);

		listing.getCharacteristics().clear();

		Set<Characteristic> characteristics = getCharacteristics(listingDto.characteristicIds(), listing);
		listing.setCharacteristics(characteristics);

		imageRepository.deleteAllByListing(listing);
		listing.getImages().clear();

		Set<Image> images = getImages(listingDto.images(), listing);
		listing.getImages().addAll(images);

		listingRepository.save(listing);

		return listingDtoMapper.toResponseDto(listing);
	}

	@Override
	public ListingResponseDto findListingById(Long id) {
		Listing listing = listingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Listing with id: " + id + " not found"));

		return listingDtoMapper.toResponseDto(listing);
	}

	@Override
	public List<ListingResponseDto> findAllListings() {
		return listingRepository.findAll().stream().map(listingDtoMapper::toResponseDto).toList();
	}

	private Set<Characteristic> getCharacteristics(Set<Long> characteristicIds, Listing listing) {
		return characteristicIds.stream().map(characteristicId -> {
			Characteristic characteristic = characteristicRepository.findById(characteristicId)
					.orElseThrow(() -> new ResourceNotFoundException(
							"Characteristic with id: " + characteristicId + " not found"));

			return characteristic;
		}).collect(Collectors.toSet());
	}

	private Set<Image> getImages(Set<String> imageUrls, Listing listing) {
		return imageUrls.stream().map(imageUrl -> {

			Image image = new Image();
			image.setImageUrl(imageUrl);
			image.setListing(listing);

			imageRepository.save(image);

			return image;
		}).collect(Collectors.toSet());
	}

	@Override
	public List<ListingResponseDto> findListingByCategoryName(String categoryName) {
		Category category = categoryRepository.findByName(categoryName)
				.orElseThrow(() -> new ResourceNotFoundException("Category with name: " + categoryName + " not found"));
		
		
		return listingRepository.findByCategory(category).stream().map(listingDtoMapper::toResponseDto).toList();
	}

	@Override
	public List<ListingResponseDto> findListingByCityName(String cityName) {
		City city = cityRepository.findByName(cityName)
				.orElseThrow(() -> new ResourceNotFoundException("City with name: " + cityName + " notfound"));
		
		return listingRepository.findByCity(city).stream().map(listingDtoMapper::toResponseDto).toList();
	}

	@Override
	public List<ListingResponseDto> findAvailableListingsByRangeDates(LocalDate checkInDate, LocalDate checkOutDate) {
		return listingRepository.findAvailableListings(checkInDate, checkOutDate).stream().map(listingDtoMapper::toResponseDto).toList();
	}

	@Override
	public List<ListingResponseDto> findAvailableListingsByRangeDatesAndCityName(LocalDate checkInDate, LocalDate checkOutDate, String cityName) {
		City city = cityRepository.findByName(cityName)
				.orElseThrow(() -> new ResourceNotFoundException("City with name: " + cityName + " notfound"));

		return listingRepository.findAvailableListingsByCity(city, checkInDate, checkOutDate).stream().map(listingDtoMapper::toResponseDto).toList();
	}
}
