package com.manumafe.vbnb.service.implementation;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manumafe.vbnb.dto.ImageDto;
import com.manumafe.vbnb.dto.ListingCreateDto;
import com.manumafe.vbnb.dto.ListingResponseDto;
import com.manumafe.vbnb.dto.mapper.ListingDtoMapper;
import com.manumafe.vbnb.entity.Category;
import com.manumafe.vbnb.entity.Characteristic;
import com.manumafe.vbnb.entity.City;
import com.manumafe.vbnb.entity.Image;
import com.manumafe.vbnb.entity.Listing;
import com.manumafe.vbnb.entity.ListingCharacteristic;
import com.manumafe.vbnb.exceptions.ResourceNotFoundException;
import com.manumafe.vbnb.repository.CategoryRepository;
import com.manumafe.vbnb.repository.CharacteristicRepository;
import com.manumafe.vbnb.repository.CityRepository;
import com.manumafe.vbnb.repository.ImageRepository;
import com.manumafe.vbnb.repository.ListingCharacteristicRepository;
import com.manumafe.vbnb.repository.ListingRepository;
import com.manumafe.vbnb.service.ListingService;

@Service
public class ListingServiceImpl implements ListingService {

	@Autowired
	private ListingRepository listingRepository;

	@Autowired
	private CityRepository cityRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private CharacteristicRepository characteristicRepository;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private ListingCharacteristicRepository listingCharacteristicRepository;

	@Autowired
	private ListingDtoMapper listingDtoMapper;

	@Override
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

		Set<ListingCharacteristic> listingCharacteristics = getListingCharacteristics(listingDto.characteristicIds(),
				listing);
		listingCharacteristicRepository.saveAll(listingCharacteristics);
		listing.setCharacteristics(listingCharacteristics);

		Set<Image> images = getImages(listingDto.images(), listing);
		imageRepository.saveAll(images);
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

		listingCharacteristicRepository.deleteAllByListingId(id);

		Set<ListingCharacteristic> listingCharacteristics = getListingCharacteristics(listingDto.characteristicIds(),
				listing);
		listingCharacteristicRepository.saveAll(listingCharacteristics);
		listing.setCharacteristics(listingCharacteristics);

		imageRepository.deleteAllByListingId(id);

		Set<Image> images = getImages(listingDto.images(), listing);
		imageRepository.saveAll(images);
		listing.setImages(images);

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

	private Set<ListingCharacteristic> getListingCharacteristics(Set<Long> characteristicsIds, Listing listing) {
		Set<ListingCharacteristic> listingCharacteristics = new HashSet<>();

		for (Long characteristicId : characteristicsIds) {
			Characteristic characteristic = characteristicRepository.findById(characteristicId)
					.orElseThrow(() -> new ResourceNotFoundException(
							"Characteristic with id: " + characteristicId + " not found"));

			ListingCharacteristic listingCharacteristic = new ListingCharacteristic();
			listingCharacteristic.setListing(listing);
			listingCharacteristic.setCharacteristic(characteristic);
			listingCharacteristics.add(listingCharacteristic);
		}

		return listingCharacteristics;
	}

	private Set<Image> getImages(Set<ImageDto> imageDtos, Listing listing) {
		Set<Image> images = new HashSet<>();

		for (ImageDto imageDto : imageDtos) {
			
			Image image = new Image();
			image.setImage_url(imageDto.imageUrl());
			image.setListing(listing);
			images.add(image);
		}

		return images;
	}
}
