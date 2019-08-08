import {Component, OnInit, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {CookieService} from 'ngx-cookie-service';
import {RestService} from '../../../../shared/services/rest.service';
import {BsModalRef} from 'ngx-bootstrap';
import {UtilsService} from '../../../../shared/services/util.service';
import * as moment from 'moment';

@Component({
  selector: 'app-zip-location',
  templateUrl: './zip-location.component.html',
  styleUrls: ['./zip-location.component.css']
})
export class ZipLocationComponent implements OnInit {
  public zip_code = null;
  public data: any[];
  public address: any;
  public msg: any;
  private coordenades = {lat: null, lng: null};
  public buttonAvailable = false;
  loading = false;
  public optionsPlaces = {
    types: [],
    componentRestrictions: {country: 'ES'}
  };
public selectedPersonId:any;
  public list_accommodation = [
    {
      'id': 167241,
      'name': 'Luxury II',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'General Pardiñas',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'B',
        'Block': [],
        'Floor': '6',
        'Number': '34',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'CRIS',
          'ResortCode': '30571'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Salamanca',
          'PostalCode': '28006',
          'DistrictCode': '1596'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '14',
          'Latitude': '40.4268053',
          'Longitude': '-3.6784033'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '2',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '65',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': '2',
        'PeopleCapacity': '6',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '2',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '4'
      },
      'host_id': 29,
      'user_code': 1472656786,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'true',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'induccion',
          'KitchenClass': 'americana',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'true',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'true',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '3',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_GARANTIA',
                  'TARJETA_RETENCION'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': 'Hoy os presentamos una recopilación de 5 cuentos de princesas ¡para soñar despiertas (y despiertos)! Y os daréis cuenta que algunas de estas no son princesas corrientes, sino princesas valientes, que han evolucionado con los tiempos y son luchadoras, representando a las mujeres de hoy en día.\n\nSeguramente a vuestros peques les encanta que les leáis un cuento antes de dormir… ¡o en cualquier momento del día! Por eso, veréis que se trata de cuentos infantiles cortos (aunque hay alguno un poquito más largo), ideales para leer junto a los más pequeños y acercarlos a la literatura infantil. Recordad que la lectura ayuda a los peques a incorporar vocabulario, a conocer culturas, a dejar volar su imaginación… ¡Ya sabéis lo bueno que es leer!\n\n¿Descubrimos juntos estos 5 cuentos de princesas?\n\nPara leer cada cuento, pulsad sobre el enlace ¡Disfrutad de la lectura de estos cuentos de princesas!',
      'inventory': {
        'k,hjngbmhm': '20',
        'Vasos de vidrio': '20',
        'Camas matrimoniales': '10'
      },
      'city': 'Madrid',
      'latlng': '40.4268053,-3.6784033',
      'coords': {
        'lat': 40.4268053,
        'lng': -3.6784033
      },
      'description': {
        'id': 39,
        'accommodation_id': 167241,
        'text': 'Este nuevo, luminoso, acogedor apartamento de 65 m2 se encuentra en el Barrio de Salamanca y tiene capacidad para 6 personas. Una zona residencial y muy tranquila de la ciudad. Tiene cerca el Parque del Retiro para aquellos que deseen disfrutar del aire libre. Este apartamento costa de dos dormitorios, la habitación principal consta de una cama doble Queen y la segunda habitación dos camas individuales.Dos baños totalmente equipados, que cuentan con amplias duchas y secador de pelo.\n<br>Un acogedor salón con amplios ventanales exteriores, que proporcionan una bonita luz natural con un cómodo sofá cama doble, TV de plasma y una pequeña zona de trabajo.\n<br>\n<br>Cocina americana, completamente equipada con todo lo necesario para cocinar, (sartenes, ollas, cubertería, etc.) frigorífico, lavadora, lavavajillas, vitrocerámica, microondas, horno, hervidor, tostadora y cafetera. Todo en perfecto estado. También dispone de terraza. \n<br>\n<br>Está equipado con aire acondicionado y calefacción.\n<br> \n<br>Se aceptan mascotas bajo petición por un suplemento de 30 euros. \n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.\n<br>\n<br>',
        'pictures': '[{"name":"Sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1479124882f3f4f8770511d600fd08e67303dfb782.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1479124882f3f4f8770511d600fd08e67303dfb782.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1479124882f3f4f8770511d600fd08e67303dfb782.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th147265805312217a1f2916287c62129a575b125def.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big147265805312217a1f2916287c62129a575b125def.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/147265805312217a1f2916287c62129a575b125def.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th147265805710bed61d266be564a94f8f620c9e59d6.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big147265805710bed61d266be564a94f8f620c9e59d6.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/147265805710bed61d266be564a94f8f620c9e59d6.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472656943bebb693d2a03b5e8ae5c6d42289c08d7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472656943bebb693d2a03b5e8ae5c6d42289c08d7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472656943bebb693d2a03b5e8ae5c6d42289c08d7.jpg","description":""},{"name":"Sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472656940376acb6addfb59d0d912122e31c3964b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472656940376acb6addfb59d0d912122e31c3964b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472656940376acb6addfb59d0d912122e31c3964b.jpg","description":""},{"name":"Sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472656957aec163e2352a34f0700c19a522f31a95.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472656957aec163e2352a34f0700c19a522f31a95.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472656957aec163e2352a34f0700c19a522f31a95.jpg","description":""},{"name":"Comedor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14726569375e20bd3cee2a06139a2ad66057ae07bb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14726569375e20bd3cee2a06139a2ad66057ae07bb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14726569375e20bd3cee2a06139a2ad66057ae07bb.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472658066ab20b6b62b4551316709068c5f58e495.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472658066ab20b6b62b4551316709068c5f58e495.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472658066ab20b6b62b4551316709068c5f58e495.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472658060807ad81989038382a8ba4bb9566d3845.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472658060807ad81989038382a8ba4bb9566d3845.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472658060807ad81989038382a8ba4bb9566d3845.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14726580634cc55c5da4fcb9ee06d52be96d50a1aa.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14726580634cc55c5da4fcb9ee06d52be96d50a1aa.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14726580634cc55c5da4fcb9ee06d52be96d50a1aa.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472656928d5803f251d6af22be01601e7ffde4908.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472656928d5803f251d6af22be01601e7ffde4908.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472656928d5803f251d6af22be01601e7ffde4908.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472656932c5232282f8e0819631050afa9b9b839a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472656932c5232282f8e0819631050afa9b9b839a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472656932c5232282f8e0819631050afa9b9b839a.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th147265693403554f7d5b70ba6fc3278141412d729b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big147265693403554f7d5b70ba6fc3278141412d729b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/147265693403554f7d5b70ba6fc3278141412d729b.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472656946a083ab82e945dbf81c13db5f46921a43.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472656946a083ab82e945dbf81c13db5f46921a43.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472656946a083ab82e945dbf81c13db5f46921a43.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14726569480230060583f0a30605fab9db72788bd9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14726569480230060583f0a30605fab9db72788bd9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14726569480230060583f0a30605fab9db72788bd9.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th147912489147571ce815501073f6afd96a40c9ee9c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big147912489147571ce815501073f6afd96a40c9ee9c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/147912489147571ce815501073f6afd96a40c9ee9c.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14791248940a629c682391d234896616684a10f21e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14791248940a629c682391d234896616684a10f21e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14791248940a629c682391d234896616684a10f21e.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1479124897d7976f1b9f57c0db56b8e38ed09b0570.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1479124897d7976f1b9f57c0db56b8e38ed09b0570.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1479124897d7976f1b9f57c0db56b8e38ed09b0570.jpg","description":""},{"name":"Salon\\\/Comedor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1479124906365ae9865ff9253fca937773bc87c971.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1479124906365ae9865ff9253fca937773bc87c971.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1479124906365ae9865ff9253fca937773bc87c971.jpg","description":""},{"name":"Salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14791249094c4e697dcde34630ac469de1c055e300.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14791249094c4e697dcde34630ac469de1c055e300.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14791249094c4e697dcde34630ac469de1c055e300.jpg","description":""},{"name":"Salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14791249122c554cffb1caefa0ca8721ef88997047.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14791249122c554cffb1caefa0ca8721ef88997047.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14791249122c554cffb1caefa0ca8721ef88997047.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th147912491450b82519f3df687a7aef464f4818c041.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big147912491450b82519f3df687a7aef464f4818c041.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/147912491450b82519f3df687a7aef464f4818c041.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14791249177a3496b575b841ab4fc843b0bcb266ea.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14791249177a3496b575b841ab4fc843b0bcb266ea.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14791249177a3496b575b841ab4fc843b0bcb266ea.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14791249205c123e04ffb98643b7577deac9c70443.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14791249205c123e04ffb98643b7577deac9c70443.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14791249205c123e04ffb98643b7577deac9c70443.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14791249239994ec8bbee696b6baffe685f9ab8e2b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14791249239994ec8bbee696b6baffe685f9ab8e2b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14791249239994ec8bbee696b6baffe685f9ab8e2b.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1479124903055564d50ead551d4a19d26b618dc1c7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1479124903055564d50ead551d4a19d26b618dc1c7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1479124903055564d50ead551d4a19d26b618dc1c7.jpg","description":""},{"name":"_P0Q6085","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1479124900306f3779f0d664847d875ce82eeb56d3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1479124900306f3779f0d664847d875ce82eeb56d3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1479124900306f3779f0d664847d875ce82eeb56d3.jpg","description":""},{"name":"Exterior edificio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th1472656691f2998b6504a9aa915eea18b9b3668069.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big1472656691f2998b6504a9aa915eea18b9b3668069.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/1472656691f2998b6504a9aa915eea18b9b3668069.jpg","description":""},{"name":"Terraza","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14726569519d668c2589e12bbfcefaf51f2f6282fc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14726569519d668c2589e12bbfcefaf51f2f6282fc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14726569519d668c2589e12bbfcefaf51f2f6282fc.jpg","description":""},{"name":"Terraza","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14726569544836fa621ce6062bf9f4b0ca80b18cb6.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14726569544836fa621ce6062bf9f4b0ca80b18cb6.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14726569544836fa621ce6062bf9f4b0ca80b18cb6.jpg","description":""},{"name":"Terraza","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/th14726566886a688292d8a036729b04119ddbf1c04c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/big14726566886a688292d8a036729b04119ddbf1c04c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1472656610eaca9289727dc97d07e506b53a0f9cd2\\\/14726566886a688292d8a036729b04119ddbf1c04c.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-luxury-ii-W1502BCPZREDNA167241IES.html'
      },
      'binnacle': [
        {
          'id': 2051,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 1,
          'created_at': '2019-04-23 19:19:43',
          'updated_at': '2019-04-23 19:19:43',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2483,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 79,
          'created_at': '2019-05-20 14:17:29',
          'updated_at': '2019-05-20 14:17:29',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2618,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 16,
          'created_at': '2019-05-23 10:55:38',
          'updated_at': '2019-05-23 10:55:38',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2684,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:18:37',
          'updated_at': '2019-05-27 14:18:37',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2696,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:27:55',
          'updated_at': '2019-05-27 14:27:55',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2698,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:37:04',
          'updated_at': '2019-05-27 14:37:04',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2699,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:38:49',
          'updated_at': '2019-05-27 14:38:49',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2700,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:39:58',
          'updated_at': '2019-05-27 14:39:58',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2701,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:41:53',
          'updated_at': '2019-05-27 14:41:53',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2702,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:43:15',
          'updated_at': '2019-05-27 14:43:15',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2703,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:45:16',
          'updated_at': '2019-05-27 14:45:16',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2704,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:46:10',
          'updated_at': '2019-05-27 14:46:10',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2705,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:48:59',
          'updated_at': '2019-05-27 14:48:59',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2706,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:50:12',
          'updated_at': '2019-05-27 14:50:12',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2707,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-05-27 14:54:37',
          'updated_at': '2019-05-27 14:54:37',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2783,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 79,
          'created_at': '2019-05-28 11:12:34',
          'updated_at': '2019-05-28 11:12:34',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2784,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 79,
          'created_at': '2019-05-28 11:15:43',
          'updated_at': '2019-05-28 11:15:43',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2785,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 79,
          'created_at': '2019-05-28 11:15:57',
          'updated_at': '2019-05-28 11:15:57',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2916,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-06-07 10:59:21',
          'updated_at': '2019-06-07 10:59:21',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 2917,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 2,
          'created_at': '2019-06-07 11:02:28',
          'updated_at': '2019-06-07 11:02:28',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 3446,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 16,
          'created_at': '2019-06-25 08:56:52',
          'updated_at': '2019-06-25 08:56:52',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 3447,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 16,
          'created_at': '2019-06-25 08:57:35',
          'updated_at': '2019-06-25 08:57:35',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 3449,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 16,
          'created_at': '2019-06-25 09:02:17',
          'updated_at': '2019-06-25 09:02:17',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 4167,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 1,
          'created_at': '2019-07-19 14:58:10',
          'updated_at': '2019-07-19 14:58:10',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 4928,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 1,
          'created_at': '2019-07-24 19:47:34',
          'updated_at': '2019-07-24 19:47:34',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 4929,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 1,
          'created_at': '2019-07-24 19:47:43',
          'updated_at': '2019-07-24 19:47:43',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 4930,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 1,
          'created_at': '2019-07-24 19:47:52',
          'updated_at': '2019-07-24 19:47:52',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 4947,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 1,
          'created_at': '2019-07-24 23:47:50',
          'updated_at': '2019-07-24 23:47:50',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        },
        {
          'id': 4948,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167241,
          'user_id': 1,
          'created_at': '2019-07-24 23:49:25',
          'updated_at': '2019-07-24 23:49:25',
          'title': 'Update',
          'message': 'The accommodation 167241 was updated.'
        }
      ],
      'host': {
        'id': 29,
        'names': 'Teresa',
        'last_names': 'Docio Rosado',
        'email': 'teresadocio@gmail.com',
        'identification': '01489227T',
        'phone': '609 062 122 \/ 917 086 867',
        'birthday': '2019-06-11',
        'created_at': '2019-03-22 10:21:33',
        'updated_at': '2019-03-22 10:21:33'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 1,
          'target_type': 'Accommodation',
          'target_id': 167241,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1563541090.jpeg"]',
            'Escritura': '\/storage\/Accommodation-___custom:Escritura-1561453337.pdf',
            'Dirección': 'General Pardiñas Nº 34, 6º B',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': 'WifiAlterhome',
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': '12\/10\/2016',
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': 'aterhomemola',
            'Referencia catastral': '2655218VK4725F0154KM',
            'Comisión de la renta': '0',
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': '12\/10\/2019'
          },
          'created_at': '2019-05-28 11:12:34',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 167243,
      'name': 'Plaza España II',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'De los Reyes',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'B',
        'Block': [],
        'Floor': '2',
        'Number': '11',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Celenque',
          'ResortCode': '23587'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Argüelles',
          'PostalCode': '28008',
          'DistrictCode': '1447'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4240892',
          'Longitude': '-3.7094349'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '1',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': [],
        'AreaHousing': {
          'Area': '72',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': '2',
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 49,
      'user_code': 1472658567,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'true',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_GARANTIA',
                  'TARJETA_RETENCION'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4240892,-3.7094349',
      'coords': {
        'lat': 40.4240892,
        'lng': -3.7094349
      },
      'description': {
        'id': 5,
        'accommodation_id': 167243,
        'text': 'Este fantástico apartamento recién reformado,  de 72 m2  cuenta con un dormitorio y capacidad para 4 personas.\n<br>La casa cuenta con una  habitación  equipada con dos camas, un salón con sofá cama y un baño totalmente equipado.\n<br>\n<br>Disponemos de ascensor, plancha, acceso gratuito a internet, secado, balcón, calefacción y TV.\n<br>La cocina está totalmente equipada, con nevera, microondas, horno, congelador, lavadora, lavavajillas, vajilla\/cubertería, utensilios\/cocina, cafetera, tostadora y hervidor de agua.\n<br>\n<br>Situado en Plaza España, a pocos pasos de la Gran Vía madrileña, tiene acceso a todo tipo de servicios, podrás disfrutar de los innumerables espectáculos y musicales de la capital, desde un buen monologo hasta el famoso musical del Rey león, rodeado todo ello por un sinfín de restaurantes y posibilidades de moverse en transporte público, a pie o si se desea hay varios parkings donde aparcar el coche.\n<br>\n<br>Se encuentra ubicado en el barrio de Argüelles, junto a Plaza de España, muy cerca del Templo de Debod y del Parque del Oeste y las Rosaledas, dos lugares únicos que permiten la desconexión total de la rutinaria ciudad. Sin embargo, a tan sólo 5 minutos andando del apartamento, nos situamos en la famosa calle Gran Vía, que llena de vida la capital. Restaurantes, comercios y la proximidad a los lugares más emblemáticos de Madrid son solo algunas de las atracciones que encontrarás en la zona.\n<br>\n<br>Para llegar al apartamento: \n<br>Ofrecemos a nuestros clientes servicio de transfer privado bajo petición (de pago). El tiempo aproximado de llegada hasta el apartamento es de 20 minutos.\n<br>En metro desde el aeropuerto, se tarda tan solo 35 minutos. Línea 8 hasta Nuevos Ministerios, realizar un transbordo para tomar la línea 10, hasta Plaza España y tendrá que caminar únicamente 74 metros, un minuto a pie.\n<br>\n<br>En Alterhome nos gusta recibir personalmente a nuestros clientes en el momento de su llegada, para darles la bienvenida y proporcionarles la información necesaria sobre el apartamento, hacer la entrega de llaves y facilitarles un plano de Madrid en el que mostramos los principales lugares de interés e información turística.\n<br>Si lo deseas también podremos hacer la compra antes de que llegue hasta el apartamento y tendrá todo lo que usted necesite pata su estancia y no tendrá que perder tiempo comprando, solo tiene que enviarnos una lista con aquello que desea 2 días antes de su llegada.\n<br>\n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 10:00h a 19:00h, y durante las 24 horas en caso de emergencia.\n<br>\n<br>',
        'pictures': '[{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1476886568191d4f22748f00a1347508e46c37ac74.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1476886568191d4f22748f00a1347508e46c37ac74.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1476886568191d4f22748f00a1347508e46c37ac74.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th14768865714dd46a5f4ac667e70a7dd1c9ceaf41d3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big14768865714dd46a5f4ac667e70a7dd1c9ceaf41d3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/14768865714dd46a5f4ac667e70a7dd1c9ceaf41d3.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th14768865348d49b2dcb01c1b42ca89b6cf2c74dabd.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big14768865348d49b2dcb01c1b42ca89b6cf2c74dabd.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/14768865348d49b2dcb01c1b42ca89b6cf2c74dabd.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th14768865665a7ac4523f533adfa74e89eb98ddbbcf.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big14768865665a7ac4523f533adfa74e89eb98ddbbcf.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/14768865665a7ac4523f533adfa74e89eb98ddbbcf.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1476886557087fb7e59b978e2030061ac67e4c819f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1476886557087fb7e59b978e2030061ac67e4c819f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1476886557087fb7e59b978e2030061ac67e4c819f.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th14768865373e7813992568eed69773cafd74e8e1e0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big14768865373e7813992568eed69773cafd74e8e1e0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/14768865373e7813992568eed69773cafd74e8e1e0.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1476886560ce26cdfd165273dd6c028e8a349a244d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1476886560ce26cdfd165273dd6c028e8a349a244d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1476886560ce26cdfd165273dd6c028e8a349a244d.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1476886549860107faeff4ebecd3fafc95cd105c22.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1476886549860107faeff4ebecd3fafc95cd105c22.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1476886549860107faeff4ebecd3fafc95cd105c22.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th14768865431372c5a5a54f146b3cab7827d07f55e8.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big14768865431372c5a5a54f146b3cab7827d07f55e8.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/14768865431372c5a5a54f146b3cab7827d07f55e8.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th147688655583d1c72d7b201f03fd513d2e9d2af0f5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big147688655583d1c72d7b201f03fd513d2e9d2af0f5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/147688655583d1c72d7b201f03fd513d2e9d2af0f5.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1476886552ecf6d9a852ca37b45e6fb5739863de27.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1476886552ecf6d9a852ca37b45e6fb5739863de27.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1476886552ecf6d9a852ca37b45e6fb5739863de27.jpg","description":""},{"name":"Frente","type":"FRONT","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th14817199419354d55cba7e63a4545951daf13167e0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big14817199419354d55cba7e63a4545951daf13167e0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/14817199419354d55cba7e63a4545951daf13167e0.jpg","description":""},{"name":"Frente","type":"FRONT","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th14817199452857490ad05c94b0a1b57303f53fe501.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big14817199452857490ad05c94b0a1b57303f53fe501.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/14817199452857490ad05c94b0a1b57303f53fe501.jpg","description":""},{"name":"Frente","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1481719943518c27f4fcc13e40e7a89e0db2f4deb9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1481719943518c27f4fcc13e40e7a89e0db2f4deb9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1481719943518c27f4fcc13e40e7a89e0db2f4deb9.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1526892366df90fbd1a35cc08313098578484a1cb1.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1526892366df90fbd1a35cc08313098578484a1cb1.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1526892366df90fbd1a35cc08313098578484a1cb1.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th15268923666e7e676b088122af74d468fb7f2389c5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big15268923666e7e676b088122af74d468fb7f2389c5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/15268923666e7e676b088122af74d468fb7f2389c5.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th15268923672859f042965def2fcdb140c9d69ff952.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big15268923672859f042965def2fcdb140c9d69ff952.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/15268923672859f042965def2fcdb140c9d69ff952.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th15268923674862df04dd4704691c4efe40a480c8fe.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big15268923674862df04dd4704691c4efe40a480c8fe.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/15268923674862df04dd4704691c4efe40a480c8fe.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th152689236881eec3ff501942153f1c59672aa04079.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big152689236881eec3ff501942153f1c59672aa04079.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/152689236881eec3ff501942153f1c59672aa04079.jpg","description":""},{"name":"1300x900 madrid noche","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th152689236849bad355fdf7a27c7c67e327e01a0073.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big152689236849bad355fdf7a27c7c67e327e01a0073.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/152689236849bad355fdf7a27c7c67e327e01a0073.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1526892369766d706a024bdcb4f8988d74fc0c3f63.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1526892369766d706a024bdcb4f8988d74fc0c3f63.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1526892369766d706a024bdcb4f8988d74fc0c3f63.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th152689236935a503752bab6731237fad035f79ed86.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big152689236935a503752bab6731237fad035f79ed86.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/152689236935a503752bab6731237fad035f79ed86.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1526892370555ba9a6ec545690b81c427fc20591f4.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1526892370555ba9a6ec545690b81c427fc20591f4.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1526892370555ba9a6ec545690b81c427fc20591f4.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th15268923709f421121ba4c3045a09dda7bb0b19861.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big15268923709f421121ba4c3045a09dda7bb0b19861.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/15268923709f421121ba4c3045a09dda7bb0b19861.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th15268923701f69e99c32dcf8cda7d9a3f11524905c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big15268923701f69e99c32dcf8cda7d9a3f11524905c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/15268923701f69e99c32dcf8cda7d9a3f11524905c.jpg","description":""},{"name":"Otros","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/th1526892371d4a42c2e27e219d5426339d2b7e8131d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/big1526892371d4a42c2e27e219d5426339d2b7e8131d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14768865336c41aae2c10c9416d39f54b9f01552ff\\\/1526892371d4a42c2e27e219d5426339d2b7e8131d.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-plaza-espana-ii-W1502BCPZREDNA167243IES.html'
      },
      'binnacle': [
        {
          'id': 2427,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167243,
          'user_id': 2,
          'created_at': '2019-05-17 12:02:13',
          'updated_at': '2019-05-17 12:02:13',
          'title': 'Update',
          'message': 'The accommodation 167243 was updated.'
        },
        {
          'id': 2509,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167243,
          'user_id': 16,
          'created_at': '2019-05-22 09:26:53',
          'updated_at': '2019-05-22 09:26:53',
          'title': 'Update',
          'message': 'The accommodation 167243 was updated.'
        },
        {
          'id': 2581,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167243,
          'user_id': 16,
          'created_at': '2019-05-23 10:08:59',
          'updated_at': '2019-05-23 10:08:59',
          'title': 'Update',
          'message': 'The accommodation 167243 was updated.'
        },
        {
          'id': 2713,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167243,
          'user_id': 79,
          'created_at': '2019-05-28 07:11:30',
          'updated_at': '2019-05-28 07:11:30',
          'title': 'Update',
          'message': 'The accommodation 167243 was updated.'
        },
        {
          'id': 2714,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167243,
          'user_id': 79,
          'created_at': '2019-05-28 07:12:26',
          'updated_at': '2019-05-28 07:12:26',
          'title': 'Update',
          'message': 'The accommodation 167243 was updated.'
        },
        {
          'id': 3450,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167243,
          'user_id': 16,
          'created_at': '2019-06-25 09:10:45',
          'updated_at': '2019-06-25 09:10:45',
          'title': 'Update',
          'message': 'The accommodation 167243 was updated.'
        },
        {
          'id': 4071,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167243,
          'user_id': 16,
          'created_at': '2019-07-17 14:07:15',
          'updated_at': '2019-07-17 14:07:15',
          'title': 'Update',
          'message': 'The accommodation 167243 was updated.'
        }
      ],
      'host': {
        'id': 49,
        'names': 'Cardizu',
        'last_names': 'SL',
        'email': 'jndediego@gmail.com',
        'identification': 'B82461500',
        'phone': '639 14 24 22 (Juan) 629 25 27 66 (Cesar)',
        'birthday': '2018-12-31',
        'created_at': '2019-03-22 13:17:28',
        'updated_at': '2019-03-22 13:17:28'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 2,
          'target_type': 'Accommodation',
          'target_id': 167243,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1563365235.pdf"]',
            'Escritura': '\/storage\/Accommodation-___custom:Escritura-1561453845.pdf',
            'Dirección': 'De los reyes Nº 11, 2º B',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-25 09:10:45',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 167245,
      'name': 'Plaza España IV',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'De los Reyes',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'D',
        'Block': [],
        'Floor': '4',
        'Number': '11',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Celenque',
          'ResortCode': '23587'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Argüelles',
          'PostalCode': '28008',
          'DistrictCode': '1447'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4240892',
          'Longitude': '-3.7094349'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '1',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '72',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 49,
      'user_code': 1472658583,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'true',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'false'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4240892,-3.7094349',
      'coords': {
        'lat': 40.4240892,
        'lng': -3.7094349
      },
      'description': {
        'id': 6,
        'accommodation_id': 167245,
        'text': 'Este fantástico apartamento recién reformado, de 75 m² cuenta con un dormitorio y capacidad para 4 personas.\n<br>\n<br>La casa cuenta con tres habitación equipada con dos camas matrimoniales y una cama litera, un salón con sofá cama y un baño totalmente equipado.\n<br>\n<br>Disponemos de ascensor, plancha, acceso gratuito a internet, secado, balcón, calefacción y TV.\n<br>\n<br>La cocina está totalmente equipada, con nevera, microondas, horno, congelador, lavadora, lavavajillas, vajilla\/cubertería, utensilios\/cocina, cafetera, tostadora y hervidor de agua.\n<br>\n<br>Situado a pocos pasos de la Gran Vía madrileña, tiene acceso a todo tipo de servicios, podrás disfrutar de los innumerables espectáculos y musicales de la capital, desde un buen monologo hasta el famoso musical del Rey león, rodeado todo ello por un sinfín de restaurantes y posibilidades de moverse en transporte público, a pie o si se desea hay varios parkings donde aparcar el coche.\n<br>\n<br>Se encuentra ubicado en el barrio de Argüelles, junto a Plaza de España, muy cerca del Templo de Debod y del Parque del Oeste y las Rosaledas, dos lugares únicos que permiten la desconexión total de la rutinaria ciudad. Sin embargo, a tan sólo 5 minutos andando del apartamento, nos situamos en la famosa calle Gran Vía, que llena de vida la capital. Restaurantes, comercios y la proximidad a los lugares más emblemáticos de Madrid son solo algunas de las atracciones que encontrarás en la zona.\n<br>\n<br>Para llegar al apartamento:\n<br>\n<br>Ofrecemos a nuestros clientes servicio de transfer privado bajo petición (de pago). El tiempo aproximado de llegada hasta el apartamento es de 20 minutos.\n<br>\n<br>En metro desde el aeropuerto, se tarda tan solo 35 minutos. Línea 8 hasta Nuevos Ministerios, realizar un transbordo para tomar la línea 10, hasta Plaza España y tendrá que caminar únicamente 200 metros, un minuto a pie.\n<br>\n<br>En Alterhome nos gusta recibir personalmente a nuestros clientes en el momento de su llegada, para darles la bienvenida y proporcionarles la información necesaria sobre el apartamento, hacer la entrega de llaves y facilitarles un plano de Madrid en el que mostramos los principales lugares de interés e información turística.\n<br>\n<br>Si lo deseas también podremos hacer la compra antes de que llegue hasta el apartamento y tendrá todo lo que usted necesite pata su estancia y no tendrá que perder tiempo comprando, solo tiene que enviarnos una lista con aquello que desea 2 días antes de su llegada.\n<br>\n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 10:00h a 19:00h, y durante las 24 horas en caso de emergencia.\n<br>',
        'pictures': '[{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1478521335ca17648384e6c392e326c310aec36318.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1478521335ca17648384e6c392e326c310aec36318.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1478521335ca17648384e6c392e326c310aec36318.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th14785213386a92dd5da4e2134c870264b096685dcd.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big14785213386a92dd5da4e2134c870264b096685dcd.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/14785213386a92dd5da4e2134c870264b096685dcd.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th14785213336a503e625271fd52b90a8b007e16c335.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big14785213336a503e625271fd52b90a8b007e16c335.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/14785213336a503e625271fd52b90a8b007e16c335.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1478521302dfd1b113ccba97627bf1f2c296b336b8.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1478521302dfd1b113ccba97627bf1f2c296b336b8.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1478521302dfd1b113ccba97627bf1f2c296b336b8.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th14785213309d2ad9955856eb07ea711f0b5f8cd47d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big14785213309d2ad9955856eb07ea711f0b5f8cd47d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/14785213309d2ad9955856eb07ea711f0b5f8cd47d.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th14785213050a93406cb2ea2987820a4a11248e27b7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big14785213050a93406cb2ea2987820a4a11248e27b7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/14785213050a93406cb2ea2987820a4a11248e27b7.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1478521327071bad9b36a439bd28023be8377a0f81.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1478521327071bad9b36a439bd28023be8377a0f81.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1478521327071bad9b36a439bd28023be8377a0f81.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th147852132293aa8b30f53ecd0bcc36a07fa5a8c33b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big147852132293aa8b30f53ecd0bcc36a07fa5a8c33b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/147852132293aa8b30f53ecd0bcc36a07fa5a8c33b.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1478521324396d1fb1a1d3289ee4798c92ca744b55.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1478521324396d1fb1a1d3289ee4798c92ca744b55.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1478521324396d1fb1a1d3289ee4798c92ca744b55.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1478521313373331c83e2fc99ddedc09cc9b817375.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1478521313373331c83e2fc99ddedc09cc9b817375.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1478521313373331c83e2fc99ddedc09cc9b817375.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th14785212999996a66761534aa5be785c6350e07a66.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big14785212999996a66761534aa5be785c6350e07a66.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/14785212999996a66761534aa5be785c6350e07a66.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1478521310312274a12d5ce30497a8eb6b7cec3db4.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1478521310312274a12d5ce30497a8eb6b7cec3db4.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1478521310312274a12d5ce30497a8eb6b7cec3db4.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th14785213070dec8e41ac383f6b70deb74a0933050d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big14785213070dec8e41ac383f6b70deb74a0933050d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/14785213070dec8e41ac383f6b70deb74a0933050d.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th14785213192fad4b5d57a2cccbbf5fd1394cb76a2f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big14785213192fad4b5d57a2cccbbf5fd1394cb76a2f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/14785213192fad4b5d57a2cccbbf5fd1394cb76a2f.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1478521316cc97c0086d0c61e2a1c326bd45850817.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1478521316cc97c0086d0c61e2a1c326bd45850817.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1478521316cc97c0086d0c61e2a1c326bd45850817.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1526892546379fcb1452c88ddff387c6d511a8bf16.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1526892546379fcb1452c88ddff387c6d511a8bf16.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1526892546379fcb1452c88ddff387c6d511a8bf16.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1526892547d390c1848ec2fe6e6b959d83944abaa1.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1526892547d390c1848ec2fe6e6b959d83944abaa1.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1526892547d390c1848ec2fe6e6b959d83944abaa1.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1526892548ff66aa2efa08a23954a77e0b70e3c182.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1526892548ff66aa2efa08a23954a77e0b70e3c182.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1526892548ff66aa2efa08a23954a77e0b70e3c182.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th152689254926f0e621ac8d4f797fcf4697d988f418.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big152689254926f0e621ac8d4f797fcf4697d988f418.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/152689254926f0e621ac8d4f797fcf4697d988f418.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th152689255091005ed41dbe246f40577492b1617203.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big152689255091005ed41dbe246f40577492b1617203.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/152689255091005ed41dbe246f40577492b1617203.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th15268925519bc4083e94fc2aff9cda9f25f86516bc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big15268925519bc4083e94fc2aff9cda9f25f86516bc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/15268925519bc4083e94fc2aff9cda9f25f86516bc.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th1526892552f131e5fc1431c3be5d63ff91f7b39e82.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big1526892552f131e5fc1431c3be5d63ff91f7b39e82.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/1526892552f131e5fc1431c3be5d63ff91f7b39e82.jpg","description":""},{"name":"Madrid","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/th15268925532a46640a704fea94101776db47cf73cd.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/big15268925532a46640a704fea94101776db47cf73cd.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14785212980f0ea38808c4365785ecee96d762b040\\\/15268925532a46640a704fea94101776db47cf73cd.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-plaza-espana-iv-W1502BCPZREDNA167245IES.html'
      },
      'binnacle': [
        {
          'id': 2583,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167245,
          'user_id': 16,
          'created_at': '2019-05-23 10:09:43',
          'updated_at': '2019-05-23 10:09:43',
          'title': 'Update',
          'message': 'The accommodation 167245 was updated.'
        },
        {
          'id': 3506,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167245,
          'user_id': 16,
          'created_at': '2019-06-26 09:04:24',
          'updated_at': '2019-06-26 09:04:24',
          'title': 'Update',
          'message': 'The accommodation 167245 was updated.'
        },
        {
          'id': 3507,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167245,
          'user_id': 16,
          'created_at': '2019-06-26 09:05:48',
          'updated_at': '2019-06-26 09:05:48',
          'title': 'Update',
          'message': 'The accommodation 167245 was updated.'
        },
        {
          'id': 3704,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167245,
          'user_id': 2,
          'created_at': '2019-07-02 11:39:49',
          'updated_at': '2019-07-02 11:39:49',
          'title': 'Update',
          'message': 'The accommodation 167245 was updated.'
        },
        {
          'id': 4073,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 167245,
          'user_id': 16,
          'created_at': '2019-07-17 14:08:50',
          'updated_at': '2019-07-17 14:08:50',
          'title': 'Update',
          'message': 'The accommodation 167245 was updated.'
        }
      ],
      'host': {
        'id': 49,
        'names': 'Cardizu',
        'last_names': 'SL',
        'email': 'jndediego@gmail.com',
        'identification': 'B82461500',
        'phone': '639 14 24 22 (Juan) 629 25 27 66 (Cesar)',
        'birthday': '2018-12-31',
        'created_at': '2019-03-22 13:17:28',
        'updated_at': '2019-03-22 13:17:28'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 3,
          'target_type': 'Accommodation',
          'target_id': 167245,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1563365330.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561539948.pdf"]',
            'Dirección': 'De los reyes Nº 11, 4º D',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': '25%',
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 09:04:24',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 174701,
      'name': 'Cortijo Sierra y Lago',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Finca',
      'user_kind': 'Finca',
      'localization': {
        'Way': 'CA-604',
        'City': {
          'Name': 'Cádiz',
          'CityCode': '6'
        },
        'Door': [],
        'Block': [],
        'Floor': [],
        'Number': 'km. 5',
        'Region': {
          'Name': 'Andalucía',
          'RegionCode': '2'
        },
        'Resort': {
          'Name': [],
          'ResortCode': []
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'Cadiz \/ Huelva - Costa de la Luz',
          'AreaCode': '41'
        },
        'District': {
          'Name': 'Sin especificar',
          'PostalCode': '1163',
          'DistrictCode': '160262'
        },
        'Locality': {
          'Name': 'Arcos de la frontera',
          'LocalityCode': '130052'
        },
        'KindOfWay': 'CARRETERA',
        'GoogleMaps': {
          'Zoom': '14',
          'Latitude': '36.690795383532',
          'Longitude': '-5.7497398884277'
        }
      },
      'distribution': {
        'Berths': '4',
        'Toilets': '1',
        'AreaPlot': {
          'Area': '7000',
          'AreaUnit': 'm'
        },
        'Bedrooms': [],
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '2',
        'AreaHousing': {
          'Area': '300',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': [],
        'IndividualBeds': '5',
        'PeopleCapacity': '13',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': [],
        'BathroomWithBathtub': '4',
        'OccupationWithoutSupplement': '6'
      },
      'host_id': null,
      'user_code': 1482231147,
      'characteristics': {
        'TV': 'true',
        'DVD': 'true',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'true',
        'Radio': 'true',
        'Sauna': 'false',
        'Garden': 'true',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'true',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'true',
        'Barbacue': 'true',
        'Elevator': 'false',
        'FirePlace': 'true',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'SwimmingPool': {
          'PoolType': 'privada',
          'Dimensions': '12x8',
          'ClosingDate': {
            'Day': [],
            'Month': []
          },
          'OpeningDate': {
            'Day': [],
            'Month': []
          },
          'MaximumDepth': {
            'Unit': 'm',
            'Value': []
          },
          'MinimumDepth': {
            'Unit': 'm',
            'Value': []
          }
        },
        'JuiceSqueazer': 'true',
        'WindowScreens': 'NO',
        'ElectricKettle': 'false',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'true',
        'NumOfTelevisions': '2',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'radiadores',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'false'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'ChangeFrequency': '1',
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'true'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'true',
              'CountableLimit': [],
              'ChangeFrequency': '1',
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'true',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'true',
          'ViewToMountain': 'true',
          'ViewToSwimmingPool': 'true'
        },
        'MinutesLength': '0',
        'NearestPlaces': {
          'NearestPlace': [
            {
              'Name': 'Arcos de la Frontera',
              'Unit': 'KM',
              'Value': '8',
              'PlaceType': 'TOWN'
            },
            {
              'Name': 'La Perdiz',
              'Unit': 'KM',
              'Value': '5',
              'PlaceType': 'SUPERMARKET'
            },
            {
              'Name': 'Mercadona',
              'Unit': 'KM',
              'Value': '8',
              'PlaceType': 'SUPERMARKET'
            }
          ]
        },
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': {
          'CityDistance': {
            'Name': 'Arcos de la Frontera',
            'Unit': 'KM',
            'Value': '8'
          },
          'SuperMarketDistance': {
            'Name': 'La Perdiz',
            'Unit': 'KM',
            'Value': '5'
          }
        },
        'LocationDescription': {
          'Howto': 'tranquila',
          'Where': 'rural',
          'Description1': 'moderno',
          'Description2': 'acogedor'
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Arcos de la frontera',
      'latlng': '36.690795383532,-5.7497398884277',
      'coords': {
        'lat': 36.690795383532,
        'lng': -5.7497398884277
      },
      'description': {
        'id': 1,
        'accommodation_id': 174701,
        'text': 'Este increíble cortijo andaluz se encuentra ubicado entre los pueblos de Arcos de la Frontera y Algar,en la provincia de Cádiz. Tiene la ubicación perfecta para disfrutar de unos días de relax junto a toda la familia. Debe su nombre "Sierra y lago" por encontrarse entre la Sierra y el Lago, pertenecientes  a las rutas de los pueblos blancos, donde también se pueden hacer excursiones variadas. El lago ´´Embalse de Guadalcacín´´ se encuentra a 1 km, también a algunos km encontraremos los pueblos cercanos y los supermercados. \n<br>\n<br>Tiene una capacidad para 13 personas y una decoración típica andaluza, acogedora y con una gran luminosidad hará que se sienta como en casa.Con 5 dormitorios: dos con camas dobles, 2 literas, y 5 camas individuales, también existe la posibilidad de añadir camas supletorias. Consta de 4 baños con bañera, todos con secador , y un aseo individual. \n<br>\n<br>La cocina americana con vitrocerámica está perfectamente equipada  con nevera, microondas, horno, congelador, lavadora, Lavavajillas, vajilla\/Cubertería, utensilios\/cocina, cafetera, freidora, tostadora y exprimidor.\n<br>\n<br>El comedor esta diseñado para 10 personas. A su vez el amplio salón dividido en dos partes, con grandes ventanales y vistas al jardín y chimenea. Tiene 2 televisores, equipo de música,dvd. Tiene calefacción por radiadores eléctricos y aire acondicionado.- \n<br>\n<br>Tiene una piscina privada para los días de verano y mobiliario de jardín, terraza y barbacoa , también parking privado y puede sentirse seguro al estar protegido con alarma. Admite mascotas por un suplemento de 30 euros.   \n<br>\n<br>El horario de check-in personal es de 16:00 a 21:00 hs. y check-out antes de las 11:00 hs. No se admite fumar en el apartamento.  \n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.\n<br>\n<br>',
        'pictures': '[{"name":"_DSC7078","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1559752883dc4179c8db15e02a6050c024b87b423a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1559752883dc4179c8db15e02a6050c024b87b423a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1559752883dc4179c8db15e02a6050c024b87b423a.jpg","description":""},{"name":"_DSC7107","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1561036380414f9da50e9b73d6e180f8ca89000ccc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1561036380414f9da50e9b73d6e180f8ca89000ccc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1561036380414f9da50e9b73d6e180f8ca89000ccc.jpg","description":""},{"name":"_DSC6872","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1559752876f1ebafd58a29dbcad854a27cb7cdb721.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1559752876f1ebafd58a29dbcad854a27cb7cdb721.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1559752876f1ebafd58a29dbcad854a27cb7cdb721.jpg","description":""},{"name":"_DSC6878","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th155975287760467dbf3baba5002bdebf25cb044d32.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big155975287760467dbf3baba5002bdebf25cb044d32.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/155975287760467dbf3baba5002bdebf25cb044d32.jpg","description":""},{"name":"_DSC6989","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1561036378455f6c399feb349ffa7344edb3ef33cc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1561036378455f6c399feb349ffa7344edb3ef33cc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1561036378455f6c399feb349ffa7344edb3ef33cc.jpg","description":""},{"name":"_DSC6985","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15610363773897f1c69dd9320705c4b13446d7d482.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15610363773897f1c69dd9320705c4b13446d7d482.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15610363773897f1c69dd9320705c4b13446d7d482.jpg","description":""},{"name":"_DSC7003","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252926b08dfabd833837fb49c6fdf7bc3827f6.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252926b08dfabd833837fb49c6fdf7bc3827f6.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252926b08dfabd833837fb49c6fdf7bc3827f6.jpg","description":""},{"name":"_DSC7029","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252926a684f0a037d13c7ce1011ab0930c0903.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252926a684f0a037d13c7ce1011ab0930c0903.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252926a684f0a037d13c7ce1011ab0930c0903.jpg","description":""},{"name":"_DSC7034","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529271ef6458a835c33d2d7988f02b30dfd1d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529271ef6458a835c33d2d7988f02b30dfd1d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529271ef6458a835c33d2d7988f02b30dfd1d.jpg","description":""},{"name":"_DSC7084","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1559752883044b610d40b35b750e801c98d9e319a8.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1559752883044b610d40b35b750e801c98d9e319a8.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1559752883044b610d40b35b750e801c98d9e319a8.jpg","description":""},{"name":"_DSC7104","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1561036380b80f299ebfda898fed4d4666b51a079d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1561036380b80f299ebfda898fed4d4666b51a079d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1561036380b80f299ebfda898fed4d4666b51a079d.jpg","description":""},{"name":"_DSC7100","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252931e996062d5f59b659d7cf5660d0c2299e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252931e996062d5f59b659d7cf5660d0c2299e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252931e996062d5f59b659d7cf5660d0c2299e.jpg","description":""},{"name":"_DSC6791","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529216e4be2235d3d26453fc989e1a16504bd.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529216e4be2235d3d26453fc989e1a16504bd.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529216e4be2235d3d26453fc989e1a16504bd.jpg","description":""},{"name":"_DSC6777","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th156225291947a3b6f0b046d45d8b27589a47d870c0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big156225291947a3b6f0b046d45d8b27589a47d870c0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/156225291947a3b6f0b046d45d8b27589a47d870c0.jpg","description":""},{"name":"_DSC6783","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252920c9abb9dbf0b0f603bac1a498a1cc98c8.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252920c9abb9dbf0b0f603bac1a498a1cc98c8.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252920c9abb9dbf0b0f603bac1a498a1cc98c8.jpg","description":""},{"name":"_DSC6786","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252920f76225ebcae1ec5b51bf3ce28707ed5c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252920f76225ebcae1ec5b51bf3ce28707ed5c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252920f76225ebcae1ec5b51bf3ce28707ed5c.jpg","description":""},{"name":"_DSC6800","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252921101ffc5ab00bb76b3d6f8527386efeca.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252921101ffc5ab00bb76b3d6f8527386efeca.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252921101ffc5ab00bb76b3d6f8527386efeca.jpg","description":""},{"name":"_DSC6803","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252922c0931607bed7acf06c28cc54b8841333.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252922c0931607bed7acf06c28cc54b8841333.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252922c0931607bed7acf06c28cc54b8841333.jpg","description":""},{"name":"_DSC7090","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252929adf219776e99863f9cc2bda980dcdc1f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252929adf219776e99863f9cc2bda980dcdc1f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252929adf219776e99863f9cc2bda980dcdc1f.jpg","description":""},{"name":"_DSC7235","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252937f7793d0515d8c9e775d8e486712a1582.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252937f7793d0515d8c9e775d8e486712a1582.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252937f7793d0515d8c9e775d8e486712a1582.jpg","description":""},{"name":"_DSC7110","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th156225293111b4bda5976e1c41fb4a2e93de66415e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big156225293111b4bda5976e1c41fb4a2e93de66415e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/156225293111b4bda5976e1c41fb4a2e93de66415e.jpg","description":""},{"name":"_DSC7123","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252932ca397038d2a0a5459658469baa09ce7f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252932ca397038d2a0a5459658469baa09ce7f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252932ca397038d2a0a5459658469baa09ce7f.jpg","description":""},{"name":"_DSC7097","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529309724cd39e601e6ac1defed1632106963.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529309724cd39e601e6ac1defed1632106963.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529309724cd39e601e6ac1defed1632106963.jpg","description":""},{"name":"_DSC7268","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th156225293846864e2f2c023a930eb6edb1b4757f81.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big156225293846864e2f2c023a930eb6edb1b4757f81.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/156225293846864e2f2c023a930eb6edb1b4757f81.jpg","description":""},{"name":"_DSC7052","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252927dc8e686778af853767314c26d22178f2.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252927dc8e686778af853767314c26d22178f2.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252927dc8e686778af853767314c26d22178f2.jpg","description":""},{"name":"_DSC7063","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252928dd4384b020eb90c6700e87205d69b0de.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252928dd4384b020eb90c6700e87205d69b0de.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252928dd4384b020eb90c6700e87205d69b0de.jpg","description":""},{"name":"_DSC7072","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th156225292993a0905d40dd45f03d4b825c4557faa7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big156225292993a0905d40dd45f03d4b825c4557faa7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/156225292993a0905d40dd45f03d4b825c4557faa7.jpg","description":""},{"name":"_DSC6941","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252923196feeb68c8af7c9ee90255159c6ee16.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252923196feeb68c8af7c9ee90255159c6ee16.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252923196feeb68c8af7c9ee90255159c6ee16.jpg","description":""},{"name":"_DSC6945","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252924999214ea3784b21c38772e224c8e4fcb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252924999214ea3784b21c38772e224c8e4fcb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252924999214ea3784b21c38772e224c8e4fcb.jpg","description":""},{"name":"_DSC6966","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529240e53d96b07fd32cd76d5b279f9e8e917.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529240e53d96b07fd32cd76d5b279f9e8e917.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529240e53d96b07fd32cd76d5b279f9e8e917.jpg","description":""},{"name":"_DSC6970","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529258e2fbee12e1bc4eff4bf1c6013fc1dd9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529258e2fbee12e1bc4eff4bf1c6013fc1dd9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529258e2fbee12e1bc4eff4bf1c6013fc1dd9.jpg","description":""},{"name":"_DSC7157","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529331254a6965ea67ee62ee7b0e28e85f143.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529331254a6965ea67ee62ee7b0e28e85f143.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529331254a6965ea67ee62ee7b0e28e85f143.jpg","description":""},{"name":"_DSC7146","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252932f02ca31382c2066a80a86d68e9fdec18.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252932f02ca31382c2066a80a86d68e9fdec18.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252932f02ca31382c2066a80a86d68e9fdec18.jpg","description":""},{"name":"_DSC7190","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15623175933032e45ae310bfa883281821236633fa.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15623175933032e45ae310bfa883281821236633fa.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15623175933032e45ae310bfa883281821236633fa.jpg","description":""},{"name":"_DSC7179","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252935cd3837f3b786dd0bd2e83bbf63b6f418.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252935cd3837f3b786dd0bd2e83bbf63b6f418.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252935cd3837f3b786dd0bd2e83bbf63b6f418.jpg","description":""},{"name":"_DSC7177","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th156225293567ad88c26c633ed390aa4bdf72e3a5c3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big156225293567ad88c26c633ed390aa4bdf72e3a5c3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/156225293567ad88c26c633ed390aa4bdf72e3a5c3.jpg","description":""},{"name":"_DSC7185","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th1562252936aece5c7d9434f776254169a7ac3c31b3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big1562252936aece5c7d9434f776254169a7ac3c31b3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/1562252936aece5c7d9434f776254169a7ac3c31b3.jpg","description":""},{"name":"_DSC7163","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529337604f4296e7bae07d087b256e6406246.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529337604f4296e7bae07d087b256e6406246.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529337604f4296e7bae07d087b256e6406246.jpg","description":""},{"name":"_DSC7168","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529342a3e4bb1e6becd5db880d353b6ccd9f5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529342a3e4bb1e6becd5db880d353b6ccd9f5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529342a3e4bb1e6becd5db880d353b6ccd9f5.jpg","description":""},{"name":"_DSC6861","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th156225292384c5beb031dce40d1c9e901b52ee823c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big156225292384c5beb031dce40d1c9e901b52ee823c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/156225292384c5beb031dce40d1c9e901b52ee823c.jpg","description":""},{"name":"_DSC7319","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th156225293883cc4d06918f87459b7bed7b21c6756e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big156225293883cc4d06918f87459b7bed7b21c6756e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/156225293883cc4d06918f87459b7bed7b21c6756e.jpg","description":""},{"name":"_DSC7225","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/th15622529366c1de549654fd43b5df992d62ef13bcc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/big15622529366c1de549654fd43b5df992d62ef13bcc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/150176942605ad4f497723c3ee54a7558ba8687cc2\\\/15622529366c1de549654fd43b5df992d62ef13bcc.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-finca-arcos-de-la-frontera-cortijo-sierra-y-lago-W1502BCPZREDNA174701IES.html'
      },
      'binnacle': [],
      'host': null,
      'comments': [],
      'custom_data': []
    },
    {
      'id': 174864,
      'name': 'Fuencarral',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'de Fuencarral',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': '4',
        'Block': 'Interior',
        'Floor': '2',
        'Number': '26',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'CRIS',
          'ResortCode': '30571'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Chueca',
          'PostalCode': '28004',
          'DistrictCode': '1598'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.422165',
          'Longitude': '-3.7005812'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '1',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '40',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 19,
      'user_code': 1482313532,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'false',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'false',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'americana',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'false',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'true',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': [],
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_GARANTIA',
                  'TARJETA_RETENCION'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': 'bien-comunicada',
          'Where': 'casco-urbano',
          'Description1': 'moderno',
          'Description2': 'confortable'
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.422165,-3.7005812',
      'coords': {
        'lat': 40.422165,
        'lng': -3.7005812
      },
      'description': {
        'id': 27,
        'accommodation_id': 174864,
        'text': 'Este acogedor estudio de 40 m2 esta ubicado en pleno centro de Madrid, en la calle Fuencarral, una de las calles mas dinámicas de la capital. Rodeado de locales comerciales, gastronómicos y de ocio. Muy cerca encontramos la Gran Vía y la Puerta del Sol, así como la mayoría de los atractivos de la ciudad. Tiene una ubicación idónea para aquellos que quieran disfrutar del centro de la ciudad. Tiene un dormitorio con cama de matrimonio y un sofá cama doble haciendo que la capacidad del apartamento sea de 4 personas. El baño esta completamente equipado al igual que la cocina de clase americana con vitrocerámica. Admite mascotas por un suplemento de 30 euros. \n<br>\n<br>El horario de check-in personal es de 16:00 a 21:00 hs. y check-out antes de las 11:00 hs. No se admite fumar en el apartamento.  \n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.',
        'pictures': '[{"name":"Salon\\\/Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830426799a94c970ceb5c0778ea6a275f618b1e0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830426799a94c970ceb5c0778ea6a275f618b1e0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830426799a94c970ceb5c0778ea6a275f618b1e0.jpg","description":""},{"name":"Salon\\\/Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th1483042653d21b1b070625dda780b5681a552a17ad.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big1483042653d21b1b070625dda780b5681a552a17ad.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/1483042653d21b1b070625dda780b5681a552a17ad.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th1483042658ab6ffa1f917310919c543bc779e80d25.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big1483042658ab6ffa1f917310919c543bc779e80d25.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/1483042658ab6ffa1f917310919c543bc779e80d25.jpg","description":""},{"name":"Salon\\\/Comedor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830426611466b59d718b5bd0fbd4156c999e8793.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830426611466b59d718b5bd0fbd4156c999e8793.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830426611466b59d718b5bd0fbd4156c999e8793.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830426648e5e59c266ad76c0477cefc6286aae55.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830426648e5e59c266ad76c0477cefc6286aae55.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830426648e5e59c266ad76c0477cefc6286aae55.jpg","description":""},{"name":"Cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830429461ee97462be7248b3fd4776b02fa5c661.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830429461ee97462be7248b3fd4776b02fa5c661.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830429461ee97462be7248b3fd4776b02fa5c661.jpg","description":""},{"name":"Salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830438415c1d22f78c99921b37cdb50067bfd671.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830438415c1d22f78c99921b37cdb50067bfd671.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830438415c1d22f78c99921b37cdb50067bfd671.jpg","description":""},{"name":"Comedor\\\/salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th148304385509044213e45fdee33971d7abe0867db3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big148304385509044213e45fdee33971d7abe0867db3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/148304385509044213e45fdee33971d7abe0867db3.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830438593d46e1fc76629f8a5bcdfd8211b8ebbc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830438593d46e1fc76629f8a5bcdfd8211b8ebbc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830438593d46e1fc76629f8a5bcdfd8211b8ebbc.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th1483042667dd8ca4da8880d48a263acfc4ae656889.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big1483042667dd8ca4da8880d48a263acfc4ae656889.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/1483042667dd8ca4da8880d48a263acfc4ae656889.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th1483043979bd1c2da40e23576f9de06ba22eb4d890.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big1483043979bd1c2da40e23576f9de06ba22eb4d890.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/1483043979bd1c2da40e23576f9de06ba22eb4d890.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830439877fa569b9465611048c678078682e25fc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830439877fa569b9465611048c678078682e25fc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830439877fa569b9465611048c678078682e25fc.jpg","description":""},{"name":"Cuarto de ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830439909e410da1d1758f58da9194b43e356249.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830439909e410da1d1758f58da9194b43e356249.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830439909e410da1d1758f58da9194b43e356249.jpg","description":""},{"name":"Cuarto de ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830439949b8d3bcff00b7de331afb759d9b11deb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830439949b8d3bcff00b7de331afb759d9b11deb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830439949b8d3bcff00b7de331afb759d9b11deb.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th1483042670c2542c08e1af8d8a5c07f50fc1a95c43.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big1483042670c2542c08e1af8d8a5c07f50fc1a95c43.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/1483042670c2542c08e1af8d8a5c07f50fc1a95c43.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830441473e28836c985e9b750ec48bd40a2c6636.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830441473e28836c985e9b750ec48bd40a2c6636.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830441473e28836c985e9b750ec48bd40a2c6636.jpg","description":""},{"name":"Televisor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830441549ef5255867cef61a229dbb2f4803becc.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830441549ef5255867cef61a229dbb2f4803becc.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830441549ef5255867cef61a229dbb2f4803becc.jpg","description":""},{"name":"Detalles","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830441580d39328d5b520e7216b5566288db8054.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830441580d39328d5b520e7216b5566288db8054.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830441580d39328d5b520e7216b5566288db8054.jpg","description":""},{"name":"Aire acondicionado","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th1483042673e8c7902ab6d8137e0d26b85a44a51707.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big1483042673e8c7902ab6d8137e0d26b85a44a51707.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/1483042673e8c7902ab6d8137e0d26b85a44a51707.jpg","description":""},{"name":"Amenities","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830442410957f742ac9203fe850a526d17f42742.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830442410957f742ac9203fe850a526d17f42742.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830442410957f742ac9203fe850a526d17f42742.jpg","description":""},{"name":"_U6A6648","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th148304435275f14e9f67be2cf817693c8f785b30af.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big148304435275f14e9f67be2cf817693c8f785b30af.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/148304435275f14e9f67be2cf817693c8f785b30af.jpg","description":""},{"name":"_U6A6653","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th14830426772ec4fe47db32541bfc2ecc48997b35f8.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big14830426772ec4fe47db32541bfc2ecc48997b35f8.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/14830426772ec4fe47db32541bfc2ecc48997b35f8.jpg","description":""},{"name":"_U6A6660","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th148304439330efb41507a01bdb85e98b689d161c70.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big148304439330efb41507a01bdb85e98b689d161c70.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/148304439330efb41507a01bdb85e98b689d161c70.jpg","description":""},{"name":"1300x900","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/th15259559724c92074fe68571e290f34d97d5b0e684.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/big15259559724c92074fe68571e290f34d97d5b0e684.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148303722976be8e99ef7ca6711c207bbffb935cad\\\/15259559724c92074fe68571e290f34d97d5b0e684.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-fuencarral-W1502BCPZREDNA174864IES.html'
      },
      'binnacle': [
        {
          'id': 2542,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 174864,
          'user_id': 16,
          'created_at': '2019-05-23 08:54:41',
          'updated_at': '2019-05-23 08:54:41',
          'title': 'Update',
          'message': 'The accommodation 174864 was updated.'
        },
        {
          'id': 3508,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 174864,
          'user_id': 16,
          'created_at': '2019-06-26 09:50:01',
          'updated_at': '2019-06-26 09:50:01',
          'title': 'Update',
          'message': 'The accommodation 174864 was updated.'
        },
        {
          'id': 3705,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 174864,
          'user_id': 2,
          'created_at': '2019-07-02 11:40:30',
          'updated_at': '2019-07-02 11:40:30',
          'title': 'Update',
          'message': 'The accommodation 174864 was updated.'
        },
        {
          'id': 3706,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 174864,
          'user_id': 2,
          'created_at': '2019-07-02 11:41:14',
          'updated_at': '2019-07-02 11:41:14',
          'title': 'Update',
          'message': 'The accommodation 174864 was updated.'
        }
      ],
      'host': {
        'id': 19,
        'names': 'Ana',
        'last_names': 'Álvarez García',
        'email': 'albertosanzr@gmail.com',
        'identification': '09033056J',
        'phone': '629 310 151',
        'birthday': '2019-04-08',
        'created_at': '2019-03-22 10:00:45',
        'updated_at': '2019-03-22 10:00:45'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 4,
          'target_type': 'Accommodation',
          'target_id': 174864,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1562067674.jpeg","\\\/storage\\\/Accommodation-___custom:Licencia-1562067674.png","\\\/storage\\\/Accommodation-___custom:Licencia-1562067674.jpeg","\\\/storage\\\/Accommodation-___custom:Licencia-1562067674.png","\\\/storage\\\/Accommodation-___custom:Licencia-1562067674.png","\\\/storage\\\/Accommodation-___custom:Licencia-1562067674.jpeg"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561542601.pdf"]',
            'Dirección': 'Fuencarral Nº 26, escalera interior 2º 4',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 09:50:01',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 177216,
      'name': 'Puerta del Sol III',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'Celenque',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'Derecha',
        'Block': [],
        'Floor': '6',
        'Number': '1',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'CENTRO 3',
          'ResortCode': '36877'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Sol',
          'PostalCode': '28013',
          'DistrictCode': '1584'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'PLAZA',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.417233',
          'Longitude': '-3.7060982'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '4',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': [],
        'AreaHousing': {
          'Area': '140',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': [],
        'IndividualBeds': [],
        'PeopleCapacity': '10',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': '1',
        'OccupationWithoutSupplement': '6'
      },
      'host_id': 64,
      'user_code': 1483532279,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'true',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': [],
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_GARANTIA',
                  'TARJETA_RETENCION'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'false'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.417233,-3.7060982',
      'coords': {
        'lat': 40.417233,
        'lng': -3.7060982
      },
      'description': {
        'id': 84,
        'accommodation_id': 177216,
        'text': 'Puerta de Sol III ofrece alojamiento en Madrid, cercano a todas los principales puntos turísticos y comerciales de Madrid tal como Puerta de Sol, Plaza Mayor,  la Gran Vía y el Palacio Real.\n<br>\n<br>Este piso de 140 m² con cuatro amplias habitaciones, cuenta con cuatro camas matrimoniales y un sofa cama en la sala. Ademas una cocina completamente equipada con utensilios de cocina y vajilla\/cuberteria, cafetera tostadora y hervidor de agua.\n<br>\n<br>La sala cuenta con TV plana, zona de comedor independiente a la cocina y acceso a internet de alta velocidad via wifi.\n<br>\n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste.\n<br>\n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:00 hs y out of hours en caso de emergencia.\n<br>\n<br>El aeropuerto Adolfo Suárez Madrid-Barajas es el más cercano y se encuentra a 30-45 minutos del piso en coche.\n<br>\n<br>Puerta de Sol es una opción genial para los viajeros interesados en la cultura, la comida y los monumentos.\n<br>\n<br>Nuestros clientes dicen que esta parte de Madrid es su favorita, según los comentarios independientes.',
        'pictures': '[{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120656f89a4f0a2b2f7d953ee281ae45a32cd9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120656f89a4f0a2b2f7d953ee281ae45a32cd9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120656f89a4f0a2b2f7d953ee281ae45a32cd9.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120773cc0cb578509be10485366bfa6bbb1c22.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120773cc0cb578509be10485366bfa6bbb1c22.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120773cc0cb578509be10485366bfa6bbb1c22.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1495097762e3b895df65273c9929389b82fb2a5285.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1495097762e3b895df65273c9929389b82fb2a5285.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1495097762e3b895df65273c9929389b82fb2a5285.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120684a4326aed02db9b59c18cf5af0d8aaa39.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120684a4326aed02db9b59c18cf5af0d8aaa39.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120684a4326aed02db9b59c18cf5af0d8aaa39.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th149812068771e3090fc9488a8a2fd4b7ad983a6667.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big149812068771e3090fc9488a8a2fd4b7ad983a6667.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/149812068771e3090fc9488a8a2fd4b7ad983a6667.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120748a3b2f146c71ed1a1b3f8424d111d911f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120748a3b2f146c71ed1a1b3f8424d111d911f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120748a3b2f146c71ed1a1b3f8424d111d911f.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120735b3c528253325e75cb4a267cc99851f60.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120735b3c528253325e75cb4a267cc99851f60.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120735b3c528253325e75cb4a267cc99851f60.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th14981207814c7091d4d14264af69917917448a27e5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big14981207814c7091d4d14264af69917917448a27e5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/14981207814c7091d4d14264af69917917448a27e5.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120713fbf5666f8b2a90d29ecfe51f9081568b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120713fbf5666f8b2a90d29ecfe51f9081568b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120713fbf5666f8b2a90d29ecfe51f9081568b.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120661ebbd58fea0dd73329413378acc9b36a3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120661ebbd58fea0dd73329413378acc9b36a3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120661ebbd58fea0dd73329413378acc9b36a3.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120680a2294a067f4133b8cdc828a96d61f838.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120680a2294a067f4133b8cdc828a96d61f838.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120680a2294a067f4133b8cdc828a96d61f838.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120742439dbdee14e915fe22c1db235c05c788.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120742439dbdee14e915fe22c1db235c05c788.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120742439dbdee14e915fe22c1db235c05c788.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120755db465254a62c8ea453091c1a60a53c17.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120755db465254a62c8ea453091c1a60a53c17.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120755db465254a62c8ea453091c1a60a53c17.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120751388efd20464bd78a0e0fdde2e8da469e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120751388efd20464bd78a0e0fdde2e8da469e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120751388efd20464bd78a0e0fdde2e8da469e.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120758345e6b849d8a1b64ac44844607afbf25.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120758345e6b849d8a1b64ac44844607afbf25.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120758345e6b849d8a1b64ac44844607afbf25.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120762fc38adb4a615e29cdab00ff77bee9060.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120762fc38adb4a615e29cdab00ff77bee9060.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120762fc38adb4a615e29cdab00ff77bee9060.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th14981207381846988ed0f361aa3e35a90b49c1ae9c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big14981207381846988ed0f361aa3e35a90b49c1ae9c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/14981207381846988ed0f361aa3e35a90b49c1ae9c.jpg","description":""},{"name":"Sala","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120720a8ad7a93784bf634494821d82af684b9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120720a8ad7a93784bf634494821d82af684b9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120720a8ad7a93784bf634494821d82af684b9.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120669060724dcc33defbcb054dc8872baaa95.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120669060724dcc33defbcb054dc8872baaa95.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120669060724dcc33defbcb054dc8872baaa95.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120691434b045081ff0ec1d3b4608f8906d752.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120691434b045081ff0ec1d3b4608f8906d752.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120691434b045081ff0ec1d3b4608f8906d752.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120716cd53fec6bf7011213d5cb8e84b0514f0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120716cd53fec6bf7011213d5cb8e84b0514f0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120716cd53fec6bf7011213d5cb8e84b0514f0.jpg","description":""},{"name":"Pasillo","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120694a67ce0a7349edac6c48dce6a09ed0f3f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120694a67ce0a7349edac6c48dce6a09ed0f3f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120694a67ce0a7349edac6c48dce6a09ed0f3f.jpg","description":""},{"name":"Corredor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120673062ab61950ef53cac8a2f8e7b121b44f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120673062ab61950ef53cac8a2f8e7b121b44f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120673062ab61950ef53cac8a2f8e7b121b44f.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120677d032e9406304cbcf56c991988f30a47e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120677d032e9406304cbcf56c991988f30a47e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120677d032e9406304cbcf56c991988f30a47e.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th149812069690f799d957415afdea9e39e2d7215225.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big149812069690f799d957415afdea9e39e2d7215225.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/149812069690f799d957415afdea9e39e2d7215225.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th14981207000a85c88b2dfd2f76e3a94c72162f3536.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big14981207000a85c88b2dfd2f76e3a94c72162f3536.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/14981207000a85c88b2dfd2f76e3a94c72162f3536.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th14981207684969f4800c8f3a64721dff9d39e8ece1.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big14981207684969f4800c8f3a64721dff9d39e8ece1.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/14981207684969f4800c8f3a64721dff9d39e8ece1.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th149812072974adad9ee64971a4674ed4edd1dc693c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big149812072974adad9ee64971a4674ed4edd1dc693c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/149812072974adad9ee64971a4674ed4edd1dc693c.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120703f62b220fe0599e1d8b79dfd525a44943.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120703f62b220fe0599e1d8b79dfd525a44943.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120703f62b220fe0599e1d8b79dfd525a44943.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th149812065927b797c082001777b28513519ab3a3ff.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big149812065927b797c082001777b28513519ab3a3ff.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/149812065927b797c082001777b28513519ab3a3ff.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120745b18c392773a8c63546c87370fa8fece5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120745b18c392773a8c63546c87370fa8fece5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120745b18c392773a8c63546c87370fa8fece5.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th14981207702cf2982a66bb2dbe42b614e5cc6fac01.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big14981207702cf2982a66bb2dbe42b614e5cc6fac01.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/14981207702cf2982a66bb2dbe42b614e5cc6fac01.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120777513849cfb7fc0f5da844123830870b51.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120777513849cfb7fc0f5da844123830870b51.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120777513849cfb7fc0f5da844123830870b51.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120706062d6afddf7cb86ab361d06f3f478888.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120706062d6afddf7cb86ab361d06f3f478888.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120706062d6afddf7cb86ab361d06f3f478888.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120732b3363881999ea663df7c595c509759b5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120732b3363881999ea663df7c595c509759b5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120732b3363881999ea663df7c595c509759b5.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120709a5604ef0031f4010175be30964fd5b3b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120709a5604ef0031f4010175be30964fd5b3b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120709a5604ef0031f4010175be30964fd5b3b.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120665c59975ce06311c3977404967465dfd84.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120665c59975ce06311c3977404967465dfd84.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120665c59975ce06311c3977404967465dfd84.jpg","description":""},{"name":"Recepci\ón","type":"RECEPTION","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th1498120723da822fca7002a68a623e74deb8f95cfe.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big1498120723da822fca7002a68a623e74deb8f95cfe.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/1498120723da822fca7002a68a623e74deb8f95cfe.jpg","description":""},{"name":"Elevador","type":"PROPERTY_FLOOR_PLANS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/th14981207654080408d29eb0fec7f344ff3d0d35887.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/big14981207654080408d29eb0fec7f344ff3d0d35887.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484555492b7dec84d535ad9a88c2621b9c8d51cd7\\\/14981207654080408d29eb0fec7f344ff3d0d35887.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-puerta-del-sol-iii-W1502BCPZREDNA177216IES.html'
      },
      'binnacle': [
        {
          'id': 2599,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 177216,
          'user_id': 16,
          'created_at': '2019-05-23 10:24:31',
          'updated_at': '2019-05-23 10:24:31',
          'title': 'Update',
          'message': 'The accommodation 177216 was updated.'
        },
        {
          'id': 3523,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 177216,
          'user_id': 16,
          'created_at': '2019-06-26 10:36:42',
          'updated_at': '2019-06-26 10:36:42',
          'title': 'Update',
          'message': 'The accommodation 177216 was updated.'
        },
        {
          'id': 4074,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 177216,
          'user_id': 16,
          'created_at': '2019-07-17 14:16:54',
          'updated_at': '2019-07-17 14:16:54',
          'title': 'Update',
          'message': 'The accommodation 177216 was updated.'
        }
      ],
      'host': {
        'id': 64,
        'names': 'Diego',
        'last_names': 'Pérez Iglesias',
        'email': 'perezdiego1@hotmail.com',
        'identification': '52369992G',
        'phone': '669 499 332‬',
        'birthday': '2019-01-09',
        'created_at': '2019-04-01 11:33:36',
        'updated_at': '2019-04-01 11:33:36'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 5,
          'target_type': 'Accommodation',
          'target_id': 177216,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561545402.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1563365813.jpeg"]',
            'Dirección': 'Plaza Celenque Nº 1 , 6º derecha',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 10:36:42',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 177597,
      'name': 'Plaza España I',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'De los Reyes',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'A',
        'Block': [],
        'Floor': '1',
        'Number': '11',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Celenque',
          'ResortCode': '23587'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Argüelles',
          'PostalCode': '28008',
          'DistrictCode': '1447'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4240892',
          'Longitude': '-3.7094349'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '1',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '70',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 49,
      'user_code': 1483975338,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'false',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'false',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'false',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'false'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4240892,-3.7094349',
      'coords': {
        'lat': 40.4240892,
        'lng': -3.7094349
      },
      'description': {
        'id': 7,
        'accommodation_id': 177597,
        'text': 'Alterhome Plaza España I ofrece alojamiento en Madrid, cercano a Puerta de Sol, a 2 calles de la Gran Vía y 5 min del Palacio Real.\n<br>\n<br>Este piso de 72 m² con una habitación, con cama matrimonial y un sofa cama en la sala. Ademas una cocina completamente equipada con utensilios de cocina y vajilla\/cuberteria, cafetera tostadora y hervidor de agua.\n<br>\n<br>La sala cuenta con TV plana, zona de comedor independiente a la cocina y acceso a internet de alta velocidad via wifi.\n<br>\n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste.\n<br>\n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:00 hs y out of hours en caso de emergencia.\n<br>\n<br>El aeropuerto Adolfo Suárez Madrid-Barajas es el más cercano y se encuentra a 30-45 minutos del piso en coche.\n<br>\n<br>Plaza España es una opción genial para los viajeros interesados en la cultura, la comida y los monumentos.\n<br>\n<br>Nuestros clientes dicen que esta parte de Madrid es su favorita, según los comentarios independientes.',
        'pictures': '[{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th153365470336ef220c50aa26badbdeef9ef67260cf.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big153365470336ef220c50aa26badbdeef9ef67260cf.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/153365470336ef220c50aa26badbdeef9ef67260cf.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655271532c6957c8e5596a9ae8c35a32f5c60b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655271532c6957c8e5596a9ae8c35a32f5c60b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655271532c6957c8e5596a9ae8c35a32f5c60b.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655273e11a818e07b86bb9b9d0490014348ab6.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655273e11a818e07b86bb9b9d0490014348ab6.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655273e11a818e07b86bb9b9d0490014348ab6.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655275605c1ad14b3cd8366dcb6362df5de0cb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655275605c1ad14b3cd8366dcb6362df5de0cb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655275605c1ad14b3cd8366dcb6362df5de0cb.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655278139798d5e1c65d96560b11ca609c7e7b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655278139798d5e1c65d96560b11ca609c7e7b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655278139798d5e1c65d96560b11ca609c7e7b.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th153365528189f5745fbca73926e747fc354d3e4b94.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big153365528189f5745fbca73926e747fc354d3e4b94.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/153365528189f5745fbca73926e747fc354d3e4b94.jpg","description":""},{"name":"Pasillo","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336552842d9f3f78f81e44a05c91711815a12aa2.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336552842d9f3f78f81e44a05c91711815a12aa2.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336552842d9f3f78f81e44a05c91711815a12aa2.jpg","description":""},{"name":"Pasillo","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655287a7bf91bc11785de15b1f936db8d8f838.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655287a7bf91bc11785de15b1f936db8d8f838.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655287a7bf91bc11785de15b1f936db8d8f838.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655290940440ac5c5e087005480b05c1a6a4ef.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655290940440ac5c5e087005480b05c1a6a4ef.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655290940440ac5c5e087005480b05c1a6a4ef.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336552932e2b2cdb20e998537fa3e077d6371fa7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336552932e2b2cdb20e998537fa3e077d6371fa7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336552932e2b2cdb20e998537fa3e077d6371fa7.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655296c8efc6f3e83f8e9871b67eabe7a74a65.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655296c8efc6f3e83f8e9871b67eabe7a74a65.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655296c8efc6f3e83f8e9871b67eabe7a74a65.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336552992aab1a2109f2d80d0d8009f5cd918f9e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336552992aab1a2109f2d80d0d8009f5cd918f9e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336552992aab1a2109f2d80d0d8009f5cd918f9e.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553027fac364763f4d12e6a86194ad1878682.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553027fac364763f4d12e6a86194ad1878682.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553027fac364763f4d12e6a86194ad1878682.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655305717f259d568c6bc2ed6a9fda2a50c2b8.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655305717f259d568c6bc2ed6a9fda2a50c2b8.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655305717f259d568c6bc2ed6a9fda2a50c2b8.jpg","description":""},{"name":"Habitaci\ón","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553074d7a117e1cb8190a998a8a08f8eb0efd.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553074d7a117e1cb8190a998a8a08f8eb0efd.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553074d7a117e1cb8190a998a8a08f8eb0efd.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553101c4f2148f22ddb2d48db3e935fe979df.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553101c4f2148f22ddb2d48db3e935fe979df.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553101c4f2148f22ddb2d48db3e935fe979df.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553129fca3ca66da86a24c88c13b755d548c3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553129fca3ca66da86a24c88c13b755d548c3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553129fca3ca66da86a24c88c13b755d548c3.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553151eecb0cb64e8de1270b57439e9953d95.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553151eecb0cb64e8de1270b57439e9953d95.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553151eecb0cb64e8de1270b57439e9953d95.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th153365531888e5c38cabf1f985f5938ea5aacd35d3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big153365531888e5c38cabf1f985f5938ea5aacd35d3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/153365531888e5c38cabf1f985f5938ea5aacd35d3.jpg","description":""},{"name":"Sala","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th153365532122a21b6cc277fe7ea88bf5ea8cde1127.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big153365532122a21b6cc277fe7ea88bf5ea8cde1127.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/153365532122a21b6cc277fe7ea88bf5ea8cde1127.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553237203d070c6b629c3681ed4c7c94e309c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553237203d070c6b629c3681ed4c7c94e309c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553237203d070c6b629c3681ed4c7c94e309c.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553263ede66c1274890e373ed42bcc1850d37.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553263ede66c1274890e373ed42bcc1850d37.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553263ede66c1274890e373ed42bcc1850d37.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655329d7b0775b5b88199b3466a459b074e065.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655329d7b0775b5b88199b3466a459b074e065.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655329d7b0775b5b88199b3466a459b074e065.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th15336553322f0de5559f8a0072e49e82215a9bc61b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big15336553322f0de5559f8a0072e49e82215a9bc61b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/15336553322f0de5559f8a0072e49e82215a9bc61b.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/th1533655335f5a93f398a40058d4ac6eff17aacb0a5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/big1533655335f5a93f398a40058d4ac6eff17aacb0a5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/148430778980061e800bfd2cf0e0d8d7f317f03775\\\/1533655335f5a93f398a40058d4ac6eff17aacb0a5.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-plaza-espana-i-W1502BCPZREDNA177597IES.html'
      },
      'binnacle': [
        {
          'id': 2580,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 177597,
          'user_id': 16,
          'created_at': '2019-05-23 10:08:25',
          'updated_at': '2019-05-23 10:08:25',
          'title': 'Update',
          'message': 'The accommodation 177597 was updated.'
        },
        {
          'id': 3524,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 177597,
          'user_id': 16,
          'created_at': '2019-06-26 10:45:29',
          'updated_at': '2019-06-26 10:45:29',
          'title': 'Update',
          'message': 'The accommodation 177597 was updated.'
        }
      ],
      'host': {
        'id': 49,
        'names': 'Cardizu',
        'last_names': 'SL',
        'email': 'jndediego@gmail.com',
        'identification': 'B82461500',
        'phone': '639 14 24 22 (Juan) 629 25 27 66 (Cesar)',
        'birthday': '2018-12-31',
        'created_at': '2019-03-22 13:17:28',
        'updated_at': '2019-03-22 13:17:28'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 6,
          'target_type': 'Accommodation',
          'target_id': 177597,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561545929.pdf"]',
            'Escritura': null,
            'Dirección': 'De los reyes Nº 11, 1º A',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 10:45:29',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 178280,
      'name': 'Puerta del Sol IV',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Estudio',
      'user_kind': 'Estudio',
      'localization': {
        'Way': 'Marques Viudos de Pontejos',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': '11',
        'Block': [],
        'Floor': '3',
        'Number': '2',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'CENTRO 1',
          'ResortCode': '36875'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Sol',
          'PostalCode': '28013',
          'DistrictCode': '1584'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4158514',
          'Longitude': '-3.7048003'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': [],
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '38',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 65,
      'user_code': 1484575147,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'false',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'false',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'americana',
          'CoffeeMachine': 'false',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'false',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_GARANTIA',
                  'TARJETA_RETENCION'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4158514,-3.7048003',
      'coords': {
        'lat': 40.4158514,
        'lng': -3.7048003
      },
      'description': {
        'id': 68,
        'accommodation_id': 178280,
        'text': 'El <b>estudio en Madrid<\/b>  posee capacidad para 4 personas. <br>Alojamiento de 38 m². <br>Dispone de ascensor, plancha, acceso&nbsp;internet (wifi), caldera individual de gas, aire&nbsp;acondicionado, 1 Televisor.<br>La cocina americana, de vitrocerámica, está equipada con nevera, microondas, horno, congelador, lavadora, vajilla\/cubertería, utensilios\/cocina y hervidor de agua.',
        'pictures': '[{"name":"A29I5471","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/th14981468593f440b7f33a1088455daea6dcd33f0b0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/big14981468593f440b7f33a1088455daea6dcd33f0b0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/14981468593f440b7f33a1088455daea6dcd33f0b0.jpg","description":""},{"name":"A29I5471","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/th149933655697123db2641693ed67ed1123979b1c73.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/big149933655697123db2641693ed67ed1123979b1c73.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/149933655697123db2641693ed67ed1123979b1c73.jpg","description":""},{"name":"_U6A7509","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/th1485967339235d143cddf5947e0993eb6b9229bdd9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/big1485967339235d143cddf5947e0993eb6b9229bdd9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/1485967339235d143cddf5947e0993eb6b9229bdd9.jpg","description":""},{"name":"_U6A7524","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/th148596759285a4f201223249bd1cb03f2198fed403.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/big148596759285a4f201223249bd1cb03f2198fed403.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/148596759285a4f201223249bd1cb03f2198fed403.jpg","description":""},{"name":"_U6A7516","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/th14859673441520807ff9554f21c33a0687046993ec.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/big14859673441520807ff9554f21c33a0687046993ec.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/14859673441520807ff9554f21c33a0687046993ec.jpg","description":""},{"name":"_U6A7567","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/th1485966565913cc415c76440a2a858c3f4b7ca309c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/big1485966565913cc415c76440a2a858c3f4b7ca309c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/1485966565913cc415c76440a2a858c3f4b7ca309c.jpg","description":""},{"name":"_U6A7595","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/th1485865277741bb00dd69ce7bd7f612900950135a6.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/big1485865277741bb00dd69ce7bd7f612900950135a6.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1484575367f0c8e9621ac0ab491c4a2f1eadbf7478\\\/1485865277741bb00dd69ce7bd7f612900950135a6.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-estudio-madrid-puerta-del-sol-iv-W1502BCPZREDNA178280IES.html'
      },
      'binnacle': [
        {
          'id': 2600,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 178280,
          'user_id': 16,
          'created_at': '2019-05-23 10:25:23',
          'updated_at': '2019-05-23 10:25:23',
          'title': 'Update',
          'message': 'The accommodation 178280 was updated.'
        },
        {
          'id': 3525,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 178280,
          'user_id': 16,
          'created_at': '2019-06-26 11:09:15',
          'updated_at': '2019-06-26 11:09:15',
          'title': 'Update',
          'message': 'The accommodation 178280 was updated.'
        }
      ],
      'host': {
        'id': 65,
        'names': 'María Reyes',
        'last_names': 'Navas Montalvo',
        'email': 'marianavas809@gmail.com',
        'identification': '70042948J',
        'phone': '646 549 514',
        'birthday': '2019-01-05',
        'created_at': '2019-04-01 11:34:52',
        'updated_at': '2019-04-01 11:34:52'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 7,
          'target_type': 'Accommodation',
          'target_id': 178280,
          'data': {
            'Rent': 'RF',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561547355.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561547355.pdf"]',
            'Dirección': 'Marques Viudos de Pontejos Nº 2, 3º 11',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 11:09:15',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 178653,
      'name': 'Plaza España III',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'De los Reyes',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'C',
        'Block': [],
        'Floor': '2',
        'Number': '11',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Celenque',
          'ResortCode': '23587'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Argüelles',
          'PostalCode': '28008',
          'DistrictCode': '1447'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4240892',
          'Longitude': '-3.7094349'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '1',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '70',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 49,
      'user_code': 1484926350,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'false',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'true',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'false',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'false',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'false',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '0'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'false',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'false',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '2',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_GARANTIA',
                  'TARJETA_RETENCION'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4240892,-3.7094349',
      'coords': {
        'lat': 40.4240892,
        'lng': -3.7094349
      },
      'description': {
        'id': 8,
        'accommodation_id': 178653,
        'text': 'Este apartamento de 70 m2 se encuentra muy cercano a la Plaza de España, a solo 10 min andando. También tiene cerca calles importantes como la Gran Vía o la calle Princesa, con locales comerciales y de ocio. El templo de Debod, famoso por sus atardeceres y valor cultural se encuentra a 10 minutos del alojamiento. \n<br>\n<br>Tiene capacidad para 4 personas. Cuenta con 1 dormitorio de cama de matrimonio y un sofá cama doble. La cocina está totalmente equipada con vitrocerámica. El baño a su vez cuenta con ducha. Cuenta también con una balcón\/terraza.\n<br>\n<br>Admite mascotas teniendo en cuenta que se aplicarán 30 euros de suplemento por el servicio. \n<br>\n<br>El horario de check-in personal es de 16:00 a 21:00 hs. y check-out antes de las 11:00 hs. No se admite fumar en el apartamento.\n<br>\n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>\n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.',
        'pictures': '[{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th1500467759124d948bf3e1f363fdccf31d8bf33edb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big1500467759124d948bf3e1f363fdccf31d8bf33edb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/1500467759124d948bf3e1f363fdccf31d8bf33edb.jpg","description":""},{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15004677620b97ff7ffd376fef24811737fc324cb9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15004677620b97ff7ffd376fef24811737fc324cb9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15004677620b97ff7ffd376fef24811737fc324cb9.jpg","description":""},{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th150046776566a5f88c1575c008f76d151dbe677136.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big150046776566a5f88c1575c008f76d151dbe677136.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/150046776566a5f88c1575c008f76d151dbe677136.jpg","description":""},{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15004677689da26480539b0640b91ff334d5f10f97.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15004677689da26480539b0640b91ff334d5f10f97.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15004677689da26480539b0640b91ff334d5f10f97.jpg","description":""},{"name":"Comedor","type":"DINNING_ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th150046777176e83272212c0021766175568778c262.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big150046777176e83272212c0021766175568778c262.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/150046777176e83272212c0021766175568778c262.jpg","description":""},{"name":"Comedor","type":"DINNING_ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15004677730ddf0f36be602c53be3c0d61dc51b449.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15004677730ddf0f36be602c53be3c0d61dc51b449.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15004677730ddf0f36be602c53be3c0d61dc51b449.jpg","description":""},{"name":"Comedor","type":"DINNING_ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th1500467776dc131a7f7affecfff1cbaeb4aa9f94c5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big1500467776dc131a7f7affecfff1cbaeb4aa9f94c5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/1500467776dc131a7f7affecfff1cbaeb4aa9f94c5.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15004677797e6b322beee8651a225f259f5caf0535.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15004677797e6b322beee8651a225f259f5caf0535.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15004677797e6b322beee8651a225f259f5caf0535.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th150046778287cc65a785b58c80a84fecd6b2145807.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big150046778287cc65a785b58c80a84fecd6b2145807.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/150046778287cc65a785b58c80a84fecd6b2145807.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15004677915cfd4371e6da726aa734c1aca24d21c1.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15004677915cfd4371e6da726aa734c1aca24d21c1.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15004677915cfd4371e6da726aa734c1aca24d21c1.jpg","description":""},{"name":"Palacio Real","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th152689246993dafeb643bc06b2d8f4582e836682cb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big152689246993dafeb643bc06b2d8f4582e836682cb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/152689246993dafeb643bc06b2d8f4582e836682cb.jpg","description":""},{"name":"Palacio Real","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15268924707540b3edb90e7f939c56179a2a2c5c50.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15268924707540b3edb90e7f939c56179a2a2c5c50.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15268924707540b3edb90e7f939c56179a2a2c5c50.jpg","description":""},{"name":"Puerta de Alcala","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th1526892470da4debefc82af0e20737228f0bbe690b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big1526892470da4debefc82af0e20737228f0bbe690b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/1526892470da4debefc82af0e20737228f0bbe690b.jpg","description":""},{"name":"Santiago Bernabeu","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th1526892471a79d5e7e8c9e62202d44754a761f3f18.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big1526892471a79d5e7e8c9e62202d44754a761f3f18.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/1526892471a79d5e7e8c9e62202d44754a761f3f18.jpg","description":""},{"name":"CIBELES","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15268924725764e1629c0555ce53bb662972b2ebc7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15268924725764e1629c0555ce53bb662972b2ebc7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15268924725764e1629c0555ce53bb662972b2ebc7.jpg","description":""},{"name":"Gran Via Noche","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th1526892473f331281e394eb553cb1d50e231f25940.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big1526892473f331281e394eb553cb1d50e231f25940.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/1526892473f331281e394eb553cb1d50e231f25940.jpg","description":""},{"name":"Paseo de la castellana","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15268924745562b4ca5f543725b3418819f061852a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15268924745562b4ca5f543725b3418819f061852a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15268924745562b4ca5f543725b3418819f061852a.jpg","description":""},{"name":"Palacio Real","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th1526892476a2b7f1cd5d3a8e5a86ccc46d022899d1.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big1526892476a2b7f1cd5d3a8e5a86ccc46d022899d1.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/1526892476a2b7f1cd5d3a8e5a86ccc46d022899d1.jpg","description":""},{"name":"Plaza de Espa\ña","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15268924776d492f9dca4cdee16900eeb92987500a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15268924776d492f9dca4cdee16900eeb92987500a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15268924776d492f9dca4cdee16900eeb92987500a.jpg","description":""},{"name":"Plaza Mayor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15268924795b54014154946308d7dbe59cc84e5b61.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15268924795b54014154946308d7dbe59cc84e5b61.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15268924795b54014154946308d7dbe59cc84e5b61.jpg","description":""},{"name":"1300x900 retiro","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th1526892482e0dab5107c47d459bd99629f5197262f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big1526892482e0dab5107c47d459bd99629f5197262f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/1526892482e0dab5107c47d459bd99629f5197262f.jpg","description":""},{"name":"1300x900","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/th15268924834744e4c0512dfadcff12682c3449d588.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/big15268924834744e4c0512dfadcff12682c3449d588.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1500467758727a5827b9889284b51c15c93edfc1da\\\/15268924834744e4c0512dfadcff12682c3449d588.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-plaza-espana-iii-W1502BCPZREDNA178653IES.html'
      },
      'binnacle': [
        {
          'id': 2372,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 178653,
          'user_id': 16,
          'created_at': '2019-05-16 07:37:18',
          'updated_at': '2019-05-16 07:37:18',
          'title': 'Update',
          'message': 'The accommodation 178653 was updated.'
        },
        {
          'id': 2582,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 178653,
          'user_id': 16,
          'created_at': '2019-05-23 10:09:21',
          'updated_at': '2019-05-23 10:09:21',
          'title': 'Update',
          'message': 'The accommodation 178653 was updated.'
        },
        {
          'id': 3526,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 178653,
          'user_id': 16,
          'created_at': '2019-06-26 11:46:20',
          'updated_at': '2019-06-26 11:46:20',
          'title': 'Update',
          'message': 'The accommodation 178653 was updated.'
        }
      ],
      'host': {
        'id': 49,
        'names': 'Cardizu',
        'last_names': 'SL',
        'email': 'jndediego@gmail.com',
        'identification': 'B82461500',
        'phone': '639 14 24 22 (Juan) 629 25 27 66 (Cesar)',
        'birthday': '2018-12-31',
        'created_at': '2019-03-22 13:17:28',
        'updated_at': '2019-03-22 13:17:28'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 8,
          'target_type': 'Accommodation',
          'target_id': 178653,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561549579.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561549579.pdf"]',
            'Dirección': 'De los reyes Nº 11, 2º C',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 11:46:19',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 184237,
      'name': 'Catedral de la Almudena',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'Segovia',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'd',
        'Block': '2',
        'Floor': '2',
        'Number': '29',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Celenque',
          'ResortCode': '23587'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'La Latina',
          'PostalCode': '28024',
          'DistrictCode': '1591'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '15',
          'Latitude': '40.413805725767',
          'Longitude': '-3.7178050223267'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '2',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '60',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': '1',
        'PeopleCapacity': '5',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '3'
      },
      'host_id': null,
      'user_code': 1488535979,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'false',
          'KitchenType': [],
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'false',
          'KitchenUtensils': 'false',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'true',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '0',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'calefaccion-central',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'false'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.413805725767,-3.7178050223267',
      'coords': {
        'lat': 40.413805725767,
        'lng': -3.7178050223267
      },
      'description': {
        'id': 35,
        'accommodation_id': 184237,
        'text': 'El apartamento en Madrid ciudad posee 2 dormitorio(s) y capacidad para 5 personas. \n<br>Alojamiento de 60 m². \n<br>Dispone de ascensor, plancha, acceso internet (wifi), secador, calefacción central, aire acondicionado, Televisión.\n<br>La cocina independiente, está equipada con nevera, microondas, horno, congelador, vajilla\/cubertería, cafetera, tostadora y hervidor de agua.\n<br>\n<br>Este grandioso apartamento, reformado y totalmente equipado, es la perfecta opción para quienes quieren disfrutar  de  la  cultura madrileña  desde el  corazón  de  la  ciudad.  Su  exquisita  decoración  lo  hace  un  lugar agradable y acogedor para estadías.\n<br>El piso cuenta con dos habitaciones. La primera posee una cama doble, mesillas de noche, grandes espejos y  grandes  armarios.  La  segunda  consta  de  la  una  cama  sencilla,  mesilla  de  noche  y  armario  empotrado. Adicional a esto el piso tiene un pequeño salón en el cual se puede encontrar un sofá cama y un pequeño escritorio con silla.\n<br>Además tiene un baño bastante amplio y luminoso. La cocina es independiente, muy amplia y totalmente equipada. El mobiliario del apartamento es muy completo. Con muebles de la mejor calidad lo que lo hacen un piso bastante cómodo. \n<br>\n<br>',
        'pictures': '[{"name":"A29I5453 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1495151909687f0fb7560856d7fa08ce65f1714665.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1495151909687f0fb7560856d7fa08ce65f1714665.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1495151909687f0fb7560856d7fa08ce65f1714665.jpg","description":""},{"name":"A29I5439 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th14951519016eddd83e6ef031b0758ac1089fddb3f5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big14951519016eddd83e6ef031b0758ac1089fddb3f5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/14951519016eddd83e6ef031b0758ac1089fddb3f5.jpg","description":""},{"name":"A29I5435 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th149515189717103f2cd984aa78852495a13715c578.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big149515189717103f2cd984aa78852495a13715c578.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/149515189717103f2cd984aa78852495a13715c578.jpg","description":""},{"name":"A29I5446 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1495151906a4708aef496bde544b8ccfa990c6dbda.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1495151906a4708aef496bde544b8ccfa990c6dbda.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1495151906a4708aef496bde544b8ccfa990c6dbda.jpg","description":""},{"name":"A29I5443 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1495151904a0a7b3cfabd6abef03715a20ed03c951.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1495151904a0a7b3cfabd6abef03715a20ed03c951.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1495151904a0a7b3cfabd6abef03715a20ed03c951.jpg","description":""},{"name":"A29I5367 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th149515187159a6c6a530ecf0d4d8222e073cfd6302.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big149515187159a6c6a530ecf0d4d8222e073cfd6302.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/149515187159a6c6a530ecf0d4d8222e073cfd6302.jpg","description":""},{"name":"A29I5377 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1495151874ff2de590f88bd122a478a0a67e88e6a5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1495151874ff2de590f88bd122a478a0a67e88e6a5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1495151874ff2de590f88bd122a478a0a67e88e6a5.jpg","description":""},{"name":"A29I5424 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th149515189121345b6a3c73b72517923434878bb0ea.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big149515189121345b6a3c73b72517923434878bb0ea.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/149515189121345b6a3c73b72517923434878bb0ea.jpg","description":""},{"name":"A29I5431 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1495151894df1d83132b974117f1732eab7e61b6a9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1495151894df1d83132b974117f1732eab7e61b6a9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1495151894df1d83132b974117f1732eab7e61b6a9.jpg","description":""},{"name":"Habitaci\ón Espejo (1)","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th149242627814879fd88e8c7f1c4e31419d8df0da55.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big149242627814879fd88e8c7f1c4e31419d8df0da55.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/149242627814879fd88e8c7f1c4e31419d8df0da55.jpg","description":""},{"name":"Cocina (3)","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1492431373ce6e8220eada0f67529cd18019ca8c14.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1492431373ce6e8220eada0f67529cd18019ca8c14.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1492431373ce6e8220eada0f67529cd18019ca8c14.jpg","description":""},{"name":"Ba\ño (3)","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th149243138077cd40f0944e0d971df1fdf1e3511427.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big149243138077cd40f0944e0d971df1fdf1e3511427.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/149243138077cd40f0944e0d971df1fdf1e3511427.jpg","description":""},{"name":"A29I5387 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1495151877741a69ccacf49c9ec72ac7324b55d951.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1495151877741a69ccacf49c9ec72ac7324b55d951.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1495151877741a69ccacf49c9ec72ac7324b55d951.jpg","description":""},{"name":"A29I5389 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th14951518801f557e3afaddd91edb737d0dac560a1c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big14951518801f557e3afaddd91edb737d0dac560a1c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/14951518801f557e3afaddd91edb737d0dac560a1c.jpg","description":""},{"name":"A29I5392 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1495151884f1a772cc825c25fbcd3e84538c5d2245.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1495151884f1a772cc825c25fbcd3e84538c5d2245.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1495151884f1a772cc825c25fbcd3e84538c5d2245.jpg","description":""},{"name":"A29I5462 (1)","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th14951519129896e5d763c46270ebb3e75b4a1ca83c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big14951519129896e5d763c46270ebb3e75b4a1ca83c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/14951519129896e5d763c46270ebb3e75b4a1ca83c.jpg","description":""},{"name":"1300x900 palario r","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1525972743548a53c59e2fb2d668aee16061f0b445.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1525972743548a53c59e2fb2d668aee16061f0b445.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1525972743548a53c59e2fb2d668aee16061f0b445.jpg","description":""},{"name":"1300x900","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th15259727434781726cd1f0462e51ef11ac370bd041.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big15259727434781726cd1f0462e51ef11ac370bd041.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/15259727434781726cd1f0462e51ef11ac370bd041.jpg","description":""},{"name":"1300","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1526645919e6d1a7d4aff2f16fcad090ff2df6aaa3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1526645919e6d1a7d4aff2f16fcad090ff2df6aaa3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1526645919e6d1a7d4aff2f16fcad090ff2df6aaa3.jpg","description":""},{"name":"1300x","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1526645920acf5d97d0571c3d8980843995dbc1253.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1526645920acf5d97d0571c3d8980843995dbc1253.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1526645920acf5d97d0571c3d8980843995dbc1253.jpg","description":""},{"name":"1300x900 pmayor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1526645920d54fbc3b9a3bcb58dd80e3b3abba12da.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1526645920d54fbc3b9a3bcb58dd80e3b3abba12da.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1526645920d54fbc3b9a3bcb58dd80e3b3abba12da.jpg","description":""},{"name":"1300x900 madrid noche","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th1526645920657f4964c157746eba9a9283cf2dc380.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big1526645920657f4964c157746eba9a9283cf2dc380.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/1526645920657f4964c157746eba9a9283cf2dc380.jpg","description":""},{"name":"1300x900 pespa\ña","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/th15266459210b3702966c2065dc4f72fe7f86783831.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/big15266459210b3702966c2065dc4f72fe7f86783831.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1492426248c262dab3966c6efb3c2fe959c68de315\\\/15266459210b3702966c2065dc4f72fe7f86783831.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-catedral-de-la-almudena-W1502BCPZREDNA184237IES.html'
      },
      'binnacle': [],
      'host': null,
      'comments': [],
      'custom_data': []
    },
    {
      'id': 188190,
      'name': 'Reina Sofía III',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'Salitre',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'D',
        'Block': 'Interior',
        'Floor': '4',
        'Number': '46',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'CENTRO 1',
          'ResortCode': '36875'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Lavapiés',
          'PostalCode': '28012',
          'DistrictCode': '1599'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4085134',
          'Longitude': '-3.6996064'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '1',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '32',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 70,
      'user_code': 1491474559,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'americana',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': '1',
          'LanguageDE': 'true',
          'LanguageDU': 'false',
          'LanguageEN': 'true',
          'LanguageES': 'true',
          'LanguageFR': 'true',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'true',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4085134,-3.6996064',
      'coords': {
        'lat': 40.4085134,
        'lng': -3.6996064
      },
      'description': {
        'id': 19,
        'accommodation_id': 188190,
        'text': 'Este encantador apartamento de 33 m2 esta ubicado en la zona de Lavapies, en el corazón de Madrid. Tenemos muy cerca los principales atractivos de la ciudad, El Rastro, la Puerta del Sol, la Plaza Mayor o la estación de Atocha esta a pocos minutos andando. Cuenta con capacidad para 4 personas. Tiene un dormitorio con cama de matrimonio y un sofá cama doble. El baño esta equipado con ducha. La cocina tiene todos los electrodomésticos necesarios y cocina americana(vitrocerámica). Las mascotas están permitidas pero se cobrará un suplemento de 30 euros.\n<br>\n<br>El horario de check-in personal es de 16:00 a 21:00 hs. y check-out antes de las 11:00 hs. No se admite fumar en el apartamento. Se aceptan mascotas bajo petición. \n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.',
        'pictures': '[{"name":"dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th149381385104e55b92b59892572d6008a8e7063ad5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big149381385104e55b92b59892572d6008a8e7063ad5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/149381385104e55b92b59892572d6008a8e7063ad5.jpg","description":""},{"name":"dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th14938138483d0d6962a6395db69aa177805088d855.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big14938138483d0d6962a6395db69aa177805088d855.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/14938138483d0d6962a6395db69aa177805088d855.jpg","description":""},{"name":"dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813845ee0612c3e188b1c90d16f23ebacc64c9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813845ee0612c3e188b1c90d16f23ebacc64c9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813845ee0612c3e188b1c90d16f23ebacc64c9.jpg","description":""},{"name":"salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1499337926905786e630c0835d7b955cc429c04b36.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1499337926905786e630c0835d7b955cc429c04b36.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1499337926905786e630c0835d7b955cc429c04b36.jpg","description":""},{"name":"salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1499337921dca884df60caa6ebb0db69ac38ff8cfa.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1499337921dca884df60caa6ebb0db69ac38ff8cfa.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1499337921dca884df60caa6ebb0db69ac38ff8cfa.jpg","description":""},{"name":"Salon\\\/Comedor","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813860bd8d13606e1f4e91db441a32537de93a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813860bd8d13606e1f4e91db441a32537de93a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813860bd8d13606e1f4e91db441a32537de93a.jpg","description":""},{"name":"Cocina\\\/Comedor","type":"DINNING_ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813867194ae6a551cad8ca5eb1703dc75ffee4.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813867194ae6a551cad8ca5eb1703dc75ffee4.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813867194ae6a551cad8ca5eb1703dc75ffee4.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813825923bae7917f67629a9e2a7fa2ff9e3c9.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813825923bae7917f67629a9e2a7fa2ff9e3c9.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813825923bae7917f67629a9e2a7fa2ff9e3c9.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th14938138572b3b0730c38918ad2de3d8c5df8ee844.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big14938138572b3b0730c38918ad2de3d8c5df8ee844.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/14938138572b3b0730c38918ad2de3d8c5df8ee844.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th149381385419f6c95f1633a5f843ea72d9ba7fb86f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big149381385419f6c95f1633a5f843ea72d9ba7fb86f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/149381385419f6c95f1633a5f843ea72d9ba7fb86f.jpg","description":""},{"name":"detalles ducha","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813828ce12b5308f69671e8621057db43a1681.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813828ce12b5308f69671e8621057db43a1681.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813828ce12b5308f69671e8621057db43a1681.jpg","description":""},{"name":"detalles ducha","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th14938138305b2a6a9f4c16a6b1f0da3a26533fc97d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big14938138305b2a6a9f4c16a6b1f0da3a26533fc97d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/14938138305b2a6a9f4c16a6b1f0da3a26533fc97d.jpg","description":""},{"name":"Amenities","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813834b020e3015b7e5ef610ddefed91f726c0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813834b020e3015b7e5ef610ddefed91f726c0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813834b020e3015b7e5ef610ddefed91f726c0.jpg","description":""},{"name":"ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813837b84a1c5d1a132119d9376f723fc36275.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813837b84a1c5d1a132119d9376f723fc36275.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813837b84a1c5d1a132119d9376f723fc36275.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813840091fb2b33cf0af6a2a053add24f2885b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813840091fb2b33cf0af6a2a053add24f2885b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813840091fb2b33cf0af6a2a053add24f2885b.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1493813842dc10d2068fbba02310a38f5fab93be07.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1493813842dc10d2068fbba02310a38f5fab93be07.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1493813842dc10d2068fbba02310a38f5fab93be07.jpg","description":""},{"name":"1300","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893920429bc90ade6bc135c54dc85b31d4f03d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893920429bc90ade6bc135c54dc85b31d4f03d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893920429bc90ade6bc135c54dc85b31d4f03d.jpg","description":""},{"name":"1300x","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893920c486b384976801ec187e3b739b6fae3a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893920c486b384976801ec187e3b739b6fae3a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893920c486b384976801ec187e3b739b6fae3a.jpg","description":""},{"name":"1300x900 alcala","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th152689392131e22cc0e028913ec5f067826afd5875.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big152689392131e22cc0e028913ec5f067826afd5875.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/152689392131e22cc0e028913ec5f067826afd5875.jpg","description":""},{"name":"1300x900 bernabeu","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893922bf31a9f4fd1486d8032eefb9f84c2161.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893922bf31a9f4fd1486d8032eefb9f84c2161.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893922bf31a9f4fd1486d8032eefb9f84c2161.jpg","description":""},{"name":"1300X900 CIBELES","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th15268939222288b58a94a8070858827539218b5036.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big15268939222288b58a94a8070858827539218b5036.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/15268939222288b58a94a8070858827539218b5036.jpg","description":""},{"name":"1300x900 madrid noche","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893923967fe901ada20acd03fe662ce5b58a87.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893923967fe901ada20acd03fe662ce5b58a87.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893923967fe901ada20acd03fe662ce5b58a87.jpg","description":""},{"name":"1300x900 p.castellana","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893924d8c586703037f68fe5fa7a4042785849.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893924d8c586703037f68fe5fa7a4042785849.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893924d8c586703037f68fe5fa7a4042785849.jpg","description":""},{"name":"1300x900 palario r","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th152689392425d486b8a99554ea241d6640d7afa920.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big152689392425d486b8a99554ea241d6640d7afa920.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/152689392425d486b8a99554ea241d6640d7afa920.jpg","description":""},{"name":"1300x900 pespa\ña","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893925c7c046c19a87560a5de06004f88d12dd.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893925c7c046c19a87560a5de06004f88d12dd.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893925c7c046c19a87560a5de06004f88d12dd.jpg","description":""},{"name":"1300x900 pmayor","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893926181d86202e2d8a1aca15070000aa3d55.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893926181d86202e2d8a1aca15070000aa3d55.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893926181d86202e2d8a1aca15070000aa3d55.jpg","description":""},{"name":"1300x900 retiro","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th1526893926a90dfcf972eb730e9f8d67ff91170f40.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big1526893926a90dfcf972eb730e9f8d67ff91170f40.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/1526893926a90dfcf972eb730e9f8d67ff91170f40.jpg","description":""},{"name":"1300x900","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/th15268939279eafe69b550475ff8704cc618c91c710.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/big15268939279eafe69b550475ff8704cc618c91c710.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1493813824441fb654c04ece325e9a822be89a0bba\\\/15268939279eafe69b550475ff8704cc618c91c710.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-reina-sofia-iii-W1502BCPZREDNA188190IES.html'
      },
      'binnacle': [
        {
          'id': 2605,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 188190,
          'user_id': 16,
          'created_at': '2019-05-23 10:30:53',
          'updated_at': '2019-05-23 10:30:53',
          'title': 'Update',
          'message': 'The accommodation 188190 was updated.'
        },
        {
          'id': 3527,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 188190,
          'user_id': 16,
          'created_at': '2019-06-26 12:01:17',
          'updated_at': '2019-06-26 12:01:17',
          'title': 'Update',
          'message': 'The accommodation 188190 was updated.'
        }
      ],
      'host': {
        'id': 70,
        'names': 'Raúl',
        'last_names': 'Bayán Hisado',
        'email': 'rabahi@movistar.es',
        'identification': '52188772R',
        'phone': '626 942 443',
        'birthday': '2019-09-18',
        'created_at': '2019-04-01 11:41:30',
        'updated_at': '2019-04-01 11:41:30'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 9,
          'target_type': 'Accommodation',
          'target_id': 188190,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561550477.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561550477.pdf"]',
            'Dirección': 'Salitre Nº 46, interior 4º D',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 12:01:17',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 188493,
      'name': 'Puerta de Toledo II',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'Ángel',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'C',
        'Block': [],
        'Floor': '1',
        'Number': '10',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'CENTRO 2',
          'ResortCode': '36876'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Acacias',
          'PostalCode': '28005',
          'DistrictCode': '1561'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.410129',
          'Longitude': '-3.7123962000001'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '1',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '45',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '4',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '2'
      },
      'host_id': 57,
      'user_code': 1491820040,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'false',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'false',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'false',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'false'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.410129,-3.7123962000001',
      'coords': {
        'lat': 40.410129,
        'lng': -3.7123962000001
      },
      'description': {
        'id': 9,
        'accommodation_id': 188493,
        'text': 'Este apartamento de 45 m2 se encuentra en el barrio madrileño de La Latina. Muy cerca se encuentra el Mercado de la Cebada, el Rastro o la Plaza Mayor.Tiene capacidad para 4 personas. Dispone de 1 dormitorio con cama de matrimonio asi como un sofa cama doble. La cocina es independiente, de vitrocerámica, está equipada con nevera, microondas, horno, congelador, lavadora, lavavajillas, vajilla\/cubertería, utensilios\/cocina y cafetera. El baño dispone de ducha y secador. Dispone de ascensor, secador, caldera individual de gas, y televisor.\n<br>\n<br>El horario de check-in personal es de 16:00 a 21:00 hs. y check-out antes de las 11:00 hs. El apartamento posee parking a 14 minutos andando, sólo admite vehículos pequeños. Consulta en caso de estar interesado. Tiene un coste adicional. No se admite fumar en el apartamento. Se aceptan mascotas bajo petición y el servicio tiene un coste de 30 euros. \n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.\n<br>',
        'pictures': '[{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th14978671826455f9424bd5862d0aec922856cc8710.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big14978671826455f9424bd5862d0aec922856cc8710.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/14978671826455f9424bd5862d0aec922856cc8710.jpg","description":""},{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th14978671620ecbd4327e032d669858afa34b8b645a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big14978671620ecbd4327e032d669858afa34b8b645a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/14978671620ecbd4327e032d669858afa34b8b645a.jpg","description":""},{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th14978671656386056f4ec1001b94065b703652e3f4.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big14978671656386056f4ec1001b94065b703652e3f4.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/14978671656386056f4ec1001b94065b703652e3f4.jpg","description":""},{"name":"Comedor","type":"DINNING_ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th14978671720361a1411e58f193059f318615dc5ad2.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big14978671720361a1411e58f193059f318615dc5ad2.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/14978671720361a1411e58f193059f318615dc5ad2.jpg","description":""},{"name":"Comedor","type":"DINNING_ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th149786716953579917376604e8b9ecad193c044eee.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big149786716953579917376604e8b9ecad193c044eee.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/149786716953579917376604e8b9ecad193c044eee.jpg","description":""},{"name":"Salon","type":"LIVING ROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th1497867175a20aeac31fa62491f74e0a07da17c2ae.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big1497867175a20aeac31fa62491f74e0a07da17c2ae.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/1497867175a20aeac31fa62491f74e0a07da17c2ae.jpg","description":""},{"name":"Cocina","type":"KITCHEN","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th14978671787fb49ad8e727e63ec755b65f5055bb19.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big14978671787fb49ad8e727e63ec755b65f5055bb19.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/14978671787fb49ad8e727e63ec755b65f5055bb19.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th1497867141864e8dbafbe17a164a250684fb5ead69.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big1497867141864e8dbafbe17a164a250684fb5ead69.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/1497867141864e8dbafbe17a164a250684fb5ead69.jpg","description":""},{"name":"Detalles ducha","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th1497867144014dc74aacf1a2342d4ca927dea0a571.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big1497867144014dc74aacf1a2342d4ca927dea0a571.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/1497867144014dc74aacf1a2342d4ca927dea0a571.jpg","description":""},{"name":"Ba\ño","type":"BATHROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th14978671506912549835d4b4504abc30f36a2f90ee.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big14978671506912549835d4b4504abc30f36a2f90ee.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/14978671506912549835d4b4504abc30f36a2f90ee.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th1497867154d6c46aaa9e6143119784ff4b60a26768.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big1497867154d6c46aaa9e6143119784ff4b60a26768.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/1497867154d6c46aaa9e6143119784ff4b60a26768.jpg","description":""},{"name":"Dormitorio","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th1497867159d21ab645c98b8a6d9457a86d935f5f5f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big1497867159d21ab645c98b8a6d9457a86d935f5f5f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/1497867159d21ab645c98b8a6d9457a86d935f5f5f.jpg","description":""},{"name":"Exterior edificio","type":"FRONT","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/th1497355121788617253da2967c3ac23a47ceebd4ce.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/big1497355121788617253da2967c3ac23a47ceebd4ce.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1491917671d5751068d3db3ac9ccb7b8e7e38760da\\\/1497355121788617253da2967c3ac23a47ceebd4ce.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-puerta-de-toledo-ii-W1502BCPZREDNA188493IES.html'
      },
      'binnacle': [
        {
          'id': 2593,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 188493,
          'user_id': 16,
          'created_at': '2019-05-23 10:19:20',
          'updated_at': '2019-05-23 10:19:20',
          'title': 'Update',
          'message': 'The accommodation 188493 was updated.'
        },
        {
          'id': 3528,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 188493,
          'user_id': 16,
          'created_at': '2019-06-26 12:11:37',
          'updated_at': '2019-06-26 12:11:37',
          'title': 'Update',
          'message': 'The accommodation 188493 was updated.'
        },
        {
          'id': 3529,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 188493,
          'user_id': 16,
          'created_at': '2019-06-26 12:18:36',
          'updated_at': '2019-06-26 12:18:36',
          'title': 'Update',
          'message': 'The accommodation 188493 was updated.'
        }
      ],
      'host': {
        'id': 57,
        'names': 'Saúl',
        'last_names': 'Sánz Casal',
        'email': 'scasal83@yahoo.es',
        'identification': '51427784Z',
        'phone': '637 535 963',
        'birthday': '2019-05-11',
        'created_at': '2019-03-22 13:50:53',
        'updated_at': '2019-03-22 13:50:53'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 10,
          'target_type': 'Accommodation',
          'target_id': 188493,
          'data': {
            'Rent': 'RF',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561551515.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561551515.pdf"]',
            'Dirección': 'Ángel Nº 10, 1º C',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': '8\/4\/2017',
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': '9637410VK3793H0011BS',
            'Comisión de la renta': '800',
            'Decoración contratada': 'No',
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': '14\/4\/2020'
          },
          'created_at': '2019-06-26 12:11:37',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 190372,
      'name': 'Palacio Real I',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'del jerte',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'Derecha',
        'Block': [],
        'Floor': '3',
        'Number': '4',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Celenque',
          'ResortCode': '23587'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'La Latina',
          'PostalCode': '28024',
          'DistrictCode': '1591'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.411144',
          'Longitude': '-3.7150277000001'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': '1',
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '2',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '2',
        'AreaHousing': {
          'Area': '90',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': [],
        'PeopleCapacity': '6',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '4'
      },
      'host_id': 40,
      'user_code': 1493289159,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'false',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'false',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'false',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'false',
          'WashingMachine': 'false',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'false',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'false',
        'WindowScreens': 'NO',
        'ElectricKettle': 'false',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '0',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'calefaccion-central',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.411144,-3.7150277000001',
      'coords': {
        'lat': 40.411144,
        'lng': -3.7150277000001
      },
      'description': {
        'id': 14,
        'accommodation_id': 190372,
        'text': 'Este fantástico apartamento de 90 m2 se encuentra en el centro de Madrid, cercano a los barrios de La Latina y Madrid Centro. Una de nuestras calles emblemáticas, la calle Bailén con el Palacio Real y la Catedral de La Almudena están muy cerca también. Tiene capacidad para 6 personas y admite mascotas por un suplemento de 30 euros.\n<br>\n<br>Tiene dos dormitorios, ambos con cama de matrimonio. El baño está equipado con ducha.\n<br>\n<br>La cocina cuenta con todos los utensilios, así como lavadora, horno, microondas y cocina vitrocerámica.\n<br>\n<br>El salón tiene un sofá cama doble, televisión y acceso gratuito a internet.\n<br>\n<br>El horario de check-in personal es de 16:00 a 21:00 hs. y check-out antes de las 11:00 hs. El apartamento posee parking a 7 minutos andando sujeto a disponibilidad y tiene un coste adicional. Consulta en caso de estar interesado.No se admite fumar en el apartamento. \n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.',
        'pictures': '[{"name":"salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809956a758b4f96b7e984724d5ed94a98506a4.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809956a758b4f96b7e984724d5ed94a98506a4.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809956a758b4f96b7e984724d5ed94a98506a4.jpg","description":""},{"name":"salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809953cb5d25f017ef7ce2a94db3f70671f30a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809953cb5d25f017ef7ce2a94db3f70671f30a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809953cb5d25f017ef7ce2a94db3f70671f30a.jpg","description":""},{"name":"salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th149380995852bd6dcd30e3021cd13aaea118d90ec1.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big149380995852bd6dcd30e3021cd13aaea118d90ec1.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/149380995852bd6dcd30e3021cd13aaea118d90ec1.jpg","description":""},{"name":"salon","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th14938099613313fc710e9d1b5b4449f3d714dc9439.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big14938099613313fc710e9d1b5b4449f3d714dc9439.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/14938099613313fc710e9d1b5b4449f3d714dc9439.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th149380994623e99ce1cb5c94ee8fb6ac6170d017f2.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big149380994623e99ce1cb5c94ee8fb6ac6170d017f2.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/149380994623e99ce1cb5c94ee8fb6ac6170d017f2.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th14938099482a5d2c8bd2bd979948358ce6df9fb858.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big14938099482a5d2c8bd2bd979948358ce6df9fb858.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/14938099482a5d2c8bd2bd979948358ce6df9fb858.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809951c6d4289596b4acfc6e9d4c366f0ca528.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809951c6d4289596b4acfc6e9d4c366f0ca528.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809951c6d4289596b4acfc6e9d4c366f0ca528.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809937e97dc99d005e66143a70504d49bd6f70.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809937e97dc99d005e66143a70504d49bd6f70.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809937e97dc99d005e66143a70504d49bd6f70.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th14938099399b714b113a3264602448a256a72b2385.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big14938099399b714b113a3264602448a256a72b2385.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/14938099399b714b113a3264602448a256a72b2385.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809941479b4b0c2be3313536b9bfca9d27a00c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809941479b4b0c2be3313536b9bfca9d27a00c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809941479b4b0c2be3313536b9bfca9d27a00c.jpg","description":""},{"name":"Dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809944f6254b304e59de6489131bbb68447e2c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809944f6254b304e59de6489131bbb68447e2c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809944f6254b304e59de6489131bbb68447e2c.jpg","description":""},{"name":"Aseo","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809925b85ccc5d06574b51cc9222d1a8b52353.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809925b85ccc5d06574b51cc9222d1a8b52353.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809925b85ccc5d06574b51cc9222d1a8b52353.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th149380993272bf8b09e61e8fff262d6e0414731f87.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big149380993272bf8b09e61e8fff262d6e0414731f87.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/149380993272bf8b09e61e8fff262d6e0414731f87.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809934a347e0e0137b9062c33082ffe386bdcf.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809934a347e0e0137b9062c33082ffe386bdcf.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809934a347e0e0137b9062c33082ffe386bdcf.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th14938099721cb0761fb7825123cdbb1c2c289b35ef.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big14938099721cb0761fb7825123cdbb1c2c289b35ef.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/14938099721cb0761fb7825123cdbb1c2c289b35ef.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809974b17765dcf6e645fcc5dc176786dac4bb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809974b17765dcf6e645fcc5dc176786dac4bb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809974b17765dcf6e645fcc5dc176786dac4bb.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809977fb56d16caa4422b3d2d1a625cebd2e91.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809977fb56d16caa4422b3d2d1a625cebd2e91.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809977fb56d16caa4422b3d2d1a625cebd2e91.jpg","description":""},{"name":"dormitorio 2","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th149380996338c2f37c24f3bc2383dff028d5eb44c2.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big149380996338c2f37c24f3bc2383dff028d5eb44c2.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/149380996338c2f37c24f3bc2383dff028d5eb44c2.jpg","description":""},{"name":"dormitorio 2","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809965970b62cea3aa8945e7c8fe1195489190.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809965970b62cea3aa8945e7c8fe1195489190.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809965970b62cea3aa8945e7c8fe1195489190.jpg","description":""},{"name":"dormitorio 2","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809968ebd0598c340ab51c4f5282702fff8910.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809968ebd0598c340ab51c4f5282702fff8910.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809968ebd0598c340ab51c4f5282702fff8910.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th14938099799a6fabbaa8d8c00e1aba4d8f4130c82c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big14938099799a6fabbaa8d8c00e1aba4d8f4130c82c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/14938099799a6fabbaa8d8c00e1aba4d8f4130c82c.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th1493809982317c0bb3c27505a48db2d0cba6c2c812.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big1493809982317c0bb3c27505a48db2d0cba6c2c812.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/1493809982317c0bb3c27505a48db2d0cba6c2c812.jpg","description":""},{"name":"Ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/th14938099840d0dd20d30b8eb21d5dbc8e7fe7887af.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/big14938099840d0dd20d30b8eb21d5dbc8e7fe7887af.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/14938099219525074a32f7a67a177a9cdd6252246b\\\/14938099840d0dd20d30b8eb21d5dbc8e7fe7887af.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-palacio-real-i-W1502BCPZREDNA190372IES.html'
      },
      'binnacle': [
        {
          'id': 2569,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 190372,
          'user_id': 16,
          'created_at': '2019-05-23 09:30:29',
          'updated_at': '2019-05-23 09:30:29',
          'title': 'Update',
          'message': 'The accommodation 190372 was updated.'
        },
        {
          'id': 3531,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 190372,
          'user_id': 16,
          'created_at': '2019-06-26 12:32:57',
          'updated_at': '2019-06-26 12:32:57',
          'title': 'Update',
          'message': 'The accommodation 190372 was updated.'
        }
      ],
      'host': {
        'id': 40,
        'names': 'Javier',
        'last_names': 'Rapallo Serrano',
        'email': 'javier_rapallo@yahoo.com',
        'identification': '50843289H',
        'phone': '686 875 586',
        'birthday': '2019-05-06',
        'created_at': '2019-03-22 11:15:56',
        'updated_at': '2019-03-22 11:15:56'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 11,
          'target_type': 'Accommodation',
          'target_id': 190372,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561552377.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561552377.pdf","\\\/storage\\\/Accommodation-___custom:Escritura-1561552377.pdf"]',
            'Dirección': 'Del jerte Nº 4, 3º derecha',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 12:32:57',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 194694,
      'name': 'Malasaña II',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'San Andres',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'D',
        'Block': [],
        'Floor': '4',
        'Number': '14',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Miguel',
          'ResortCode': '30556'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Malasaña',
          'PostalCode': '28004',
          'DistrictCode': '1903921'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4266813',
          'Longitude': '-3.7035543'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '2',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '64',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': [],
        'IndividualBeds': '2',
        'PeopleCapacity': '5',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': '1',
        'BathroomWithBathtub': [],
        'OccupationWithoutSupplement': '4'
      },
      'host_id': 35,
      'user_code': 1495620773,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'false',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'false',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'vitroceramica',
          'KitchenClass': 'independiente',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'true',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '0',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'bomba-calor',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4266813,-3.7035543',
      'coords': {
        'lat': 40.4266813,
        'lng': -3.7035543
      },
      'description': {
        'id': 13,
        'accommodation_id': 194694,
        'text': 'Este hermoso apartamento, reformado y totalmente equipado, es la perfecta opción para quienes quieren disfrutar de la cultura madrileña desde el corazón de la ciudad. Su exquisita decoración lo hace un lugar agradable y acogedor para pasar unos días rodeado de los tuyos.\n<br>El piso cuenta con un salón comedor, una cocina con todo lo necesario, un cuarto de baño amplio y luminoso con ducha, gel, champú y secador de pelo, dos habitaciones, una con una cama de matrimonio con televisión y otra con dos camas individuales. Aliciente a esto, posee una cama supletoria individual, haciendo que su capacidad máxima sea para 5 personas. El edificio consta de ascensor y el piso de aire acondicionado y Wi-fi.\n<br>El mobiliario del apartamento es muy completo. Con muebles de la mejor calidad lo que lo hacen un piso bastante cómodo. \n<br>La animada Plaza del Dos de Mayo es sin duda el corazón del barrio de Malasaña. Su nombre se refiere a los levantamientos del 2 de mayo de 1808, cuando la ciudad de Madrid se rebeló contra las tropas invasoras de Napoleón. El monumento central de Daoiz y Velarde es un homenaje a dos de los héroes de este acontecimiento histórico. También admitimos mascotas, aunque se deberá abonar un importe de 30 euros por el servicio.\n<br>\n<br>El horario de check-in personal es de 16:00 a 21:00 hs. y check-out antes de las 11:00 hs. No se admite fumar en el establecimiento. \n<br>En Alterhome ofrecemos a nuestros huéspedes un numero de servicios adicionales- transfer privado para llegar al apartamento, early \/ late check-in y late check-out (sujetos a disponibilidad), realizar la compra por tí, y muchos mas. Estos servicios son bajo petición y tienen un coste. \n<br>Para nosotros es de vital importancia que su estancia sea lo más placentera posible y por ello estamos siempre disponibles en nuestro horario de oficina de 09:00 a 21:0o hs y out of hours en caso de emergencia.\n<br>\n<br>',
        'pictures': '[{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th149812824423002f5a881fb9953043eb1a49f69978.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big149812824423002f5a881fb9953043eb1a49f69978.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/149812824423002f5a881fb9953043eb1a49f69978.jpg","description":""},{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128251a7f250f09fa90c3175b38fd633ff4882.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128251a7f250f09fa90c3175b38fd633ff4882.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128251a7f250f09fa90c3175b38fd633ff4882.jpg","description":""},{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282471ea71f53afe28ee2c2b163d395a17a52.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282471ea71f53afe28ee2c2b163d395a17a52.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282471ea71f53afe28ee2c2b163d395a17a52.jpg","description":""},{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128205c9e89c12458d04bdcc04fbe130ce826d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128205c9e89c12458d04bdcc04fbe130ce826d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128205c9e89c12458d04bdcc04fbe130ce826d.jpg","description":""},{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128201902ee435f6a38c73889c000f57c4d4e7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128201902ee435f6a38c73889c000f57c4d4e7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128201902ee435f6a38c73889c000f57c4d4e7.jpg","description":""},{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128289136b946f69916a8f961234ebd41c8356.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128289136b946f69916a8f961234ebd41c8356.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128289136b946f69916a8f961234ebd41c8356.jpg","description":""},{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th149812829369b371d32505a8297bac0c11766ec20a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big149812829369b371d32505a8297bac0c11766ec20a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/149812829369b371d32505a8297bac0c11766ec20a.jpg","description":""},{"name":"sal\ón","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th149812820892d9d15c6591047a38e2af79b2afa80d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big149812820892d9d15c6591047a38e2af79b2afa80d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/149812820892d9d15c6591047a38e2af79b2afa80d.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981281940ca6f152532da78549f518f4967c68a2.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981281940ca6f152532da78549f518f4967c68a2.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981281940ca6f152532da78549f518f4967c68a2.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282254a510cdadb7e20629137479d0bf80d13.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282254a510cdadb7e20629137479d0bf80d13.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282254a510cdadb7e20629137479d0bf80d13.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128267a804f6546f7579ec0197a5aaec427447.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128267a804f6546f7579ec0197a5aaec427447.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128267a804f6546f7579ec0197a5aaec427447.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282168f1ec9c405a4737c2e604fbba7819b76.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282168f1ec9c405a4737c2e604fbba7819b76.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282168f1ec9c405a4737c2e604fbba7819b76.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128253fb763a1d8876ac8583601bfbb21b544c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128253fb763a1d8876ac8583601bfbb21b544c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128253fb763a1d8876ac8583601bfbb21b544c.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282560e7554ea36c6fb2fdc03ca84fd975392.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282560e7554ea36c6fb2fdc03ca84fd975392.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282560e7554ea36c6fb2fdc03ca84fd975392.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128263eded5d156c25e3082cc499c65b36d579.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128263eded5d156c25e3082cc499c65b36d579.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128263eded5d156c25e3082cc499c65b36d579.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128219d393b1c21126186d636714475ca870ac.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128219d393b1c21126186d636714475ca870ac.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128219d393b1c21126186d636714475ca870ac.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128234ed760596c894de0d0bff8909462ba1ba.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128234ed760596c894de0d0bff8909462ba1ba.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128234ed760596c894de0d0bff8909462ba1ba.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128187643136ea378a1791fdc0a0463e60ffed.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128187643136ea378a1791fdc0a0463e60ffed.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128187643136ea378a1791fdc0a0463e60ffed.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128272c98fea6fac7f63ff624435960fb8946b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128272c98fea6fac7f63ff624435960fb8946b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128272c98fea6fac7f63ff624435960fb8946b.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282757ded2730bde3d8819f888791de7a1d26.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282757ded2730bde3d8819f888791de7a1d26.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282757ded2730bde3d8819f888791de7a1d26.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th149812821469457e78151d24cdf2226af55a3b93c8.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big149812821469457e78151d24cdf2226af55a3b93c8.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/149812821469457e78151d24cdf2226af55a3b93c8.jpg","description":""},{"name":"dormitorio","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282224d7826762869ef1004ef3424eb79b8b3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282224d7826762869ef1004ef3424eb79b8b3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282224d7826762869ef1004ef3424eb79b8b3.jpg","description":""},{"name":"A29I4957","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981283116bb6b4dc5072e38e4c256705176957b1.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981283116bb6b4dc5072e38e4c256705176957b1.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981283116bb6b4dc5072e38e4c256705176957b1.jpg","description":""},{"name":"cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th149812819172a4b4c9bb65597ef79b4ae769675625.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big149812819172a4b4c9bb65597ef79b4ae769675625.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/149812819172a4b4c9bb65597ef79b4ae769675625.jpg","description":""},{"name":"cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128228ec82e240b2ecae563dea95106a2e2d9e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128228ec82e240b2ecae563dea95106a2e2d9e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128228ec82e240b2ecae563dea95106a2e2d9e.jpg","description":""},{"name":"cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128260a45eb4af4f49091301eb7dcf41a0405a.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128260a45eb4af4f49091301eb7dcf41a0405a.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128260a45eb4af4f49091301eb7dcf41a0405a.jpg","description":""},{"name":"cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282318762ba21252f13f61ffeeeeb0f3f4ea0.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282318762ba21252f13f61ffeeeeb0f3f4ea0.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282318762ba21252f13f61ffeeeeb0f3f4ea0.jpg","description":""},{"name":"cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128301bc4bdfaaf6cd6d0c3b95d2a151240fef.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128301bc4bdfaaf6cd6d0c3b95d2a151240fef.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128301bc4bdfaaf6cd6d0c3b95d2a151240fef.jpg","description":""},{"name":"cocina","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981283049e052825edeeb1a0f9b30fd2b5530004.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981283049e052825edeeb1a0f9b30fd2b5530004.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981283049e052825edeeb1a0f9b30fd2b5530004.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282389a0b41ef0a3db4cfa45425c38ac937b3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282389a0b41ef0a3db4cfa45425c38ac937b3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282389a0b41ef0a3db4cfa45425c38ac937b3.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128241f3d1e0455f4d3fb0b2b2671c49324fe4.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128241f3d1e0455f4d3fb0b2b2671c49324fe4.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128241f3d1e0455f4d3fb0b2b2671c49324fe4.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128280b5e0cdfabe7973604c261e4765b0e75e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128280b5e0cdfabe7973604c261e4765b0e75e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128280b5e0cdfabe7973604c261e4765b0e75e.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282849dbc6f854cadc62dace87b2b367e0a27.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282849dbc6f854cadc62dace87b2b367e0a27.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282849dbc6f854cadc62dace87b2b367e0a27.jpg","description":""},{"name":"ba\ño","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981283075b507f5d62a5b806999a55fa186e55fe.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981283075b507f5d62a5b806999a55fa186e55fe.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981283075b507f5d62a5b806999a55fa186e55fe.jpg","description":""},{"name":"A29I4862","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th14981282977380edd17d1e9db1b3bb7d560e36e7cf.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big14981282977380edd17d1e9db1b3bb7d560e36e7cf.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/14981282977380edd17d1e9db1b3bb7d560e36e7cf.jpg","description":""},{"name":"A29I4976","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128198d001941fc80cb4f93237793d40caccf7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128198d001941fc80cb4f93237793d40caccf7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128198d001941fc80cb4f93237793d40caccf7.jpg","description":""},{"name":"A29I5027","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/th1498128212d5630bb4f2bb2521990c55aafbc5e803.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/big1498128212d5630bb4f2bb2521990c55aafbc5e803.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1495621856fbff967dc06c128ddda3f9474b1e166c\\\/1498128212d5630bb4f2bb2521990c55aafbc5e803.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-malasana-ii-W1502BCPZREDNA194694IES.html'
      },
      'binnacle': [
        {
          'id': 2562,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 194694,
          'user_id': 16,
          'created_at': '2019-05-23 09:26:02',
          'updated_at': '2019-05-23 09:26:02',
          'title': 'Update',
          'message': 'The accommodation 194694 was updated.'
        },
        {
          'id': 3532,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 194694,
          'user_id': 16,
          'created_at': '2019-06-26 12:39:54',
          'updated_at': '2019-06-26 12:39:54',
          'title': 'Update',
          'message': 'The accommodation 194694 was updated.'
        }
      ],
      'host': {
        'id': 35,
        'names': 'Leonor (Tina) \/ Agustina',
        'last_names': 'Azpurua Baez \/ Rubio',
        'email': 'tinacacto@gmail.com',
        'identification': '54363760V',
        'phone': '628 166 815',
        'birthday': '2018-12-31',
        'created_at': '2019-03-22 10:57:05',
        'updated_at': '2019-03-22 10:57:05'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 12,
          'target_type': 'Accommodation',
          'target_id': 194694,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561552794.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561552794.jpeg"]',
            'Dirección': 'Monteleon 18 1º D',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 12:39:54',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    },
    {
      'id': 195039,
      'name': 'Plaza Mayor',
      'purpose': 'ALQUILER',
      'company': 'sensaapp',
      'master_kind': 'Apartamento',
      'user_kind': 'Apartamento',
      'localization': {
        'Way': 'Grafal',
        'City': {
          'Name': 'Madrid provincia',
          'CityCode': '4'
        },
        'Door': 'A',
        'Block': [],
        'Floor': '3',
        'Number': '7',
        'Region': {
          'Name': 'Comunidad de Madrid',
          'RegionCode': '4'
        },
        'Resort': {
          'Name': 'Celenque',
          'ResortCode': '23587'
        },
        'Country': {
          'Name': 'España',
          'ISOCode': 'ES',
          'CountryCode': '1'
        },
        'AreaDist': {
          'Name': 'classurban',
          'AreaCode': '138'
        },
        'District': {
          'Name': 'Palacio',
          'PostalCode': '28005',
          'DistrictCode': '1583'
        },
        'Locality': {
          'Name': 'Madrid',
          'LocalityCode': '367'
        },
        'KindOfWay': 'CALLE',
        'GoogleMaps': {
          'Zoom': '16',
          'Latitude': '40.4128483',
          'Longitude': '-3.7083425'
        }
      },
      'distribution': {
        'Berths': [],
        'Toilets': [],
        'AreaPlot': {
          'Area': [],
          'AreaUnit': 'm'
        },
        'Bedrooms': '2',
        'KingBeds': [],
        'QueenBeds': [],
        'DoubleBeds': '1',
        'AreaHousing': {
          'Area': '80',
          'AreaUnit': 'm'
        },
        'DoubleSofaBed': '1',
        'IndividualBeds': '2',
        'PeopleCapacity': '6',
        'AcceptYoungsters': 'true',
        'IndividualSofaBed': [],
        'MinimumOccupation': '1',
        'BathroomWithShower': [],
        'BathroomWithBathtub': '1',
        'OccupationWithoutSupplement': '4'
      },
      'host_id': 51,
      'user_code': 1495800369,
      'characteristics': {
        'TV': 'true',
        'DVD': 'false',
        'Gym': 'false',
        'Iron': 'true',
        'Alarm': 'false',
        'Radio': 'false',
        'Sauna': 'false',
        'Garden': 'false',
        'Paddel': 'false',
        'Squash': 'false',
        'Tennis': 'false',
        'Balcony': 'true',
        'Jacuzzi': 'false',
        'Kitchen': {
          'Oven': 'true',
          'Dryer': 'false',
          'Fryer': 'false',
          'Fridge': 'true',
          'Freezer': 'true',
          'Toaster': 'true',
          'Microwave': 'true',
          'TableWare': 'true',
          'Dishwasher': 'true',
          'KitchenType': 'gas',
          'KitchenClass': 'americana',
          'CoffeeMachine': 'true',
          'WashingMachine': 'true',
          'KitchenUtensils': 'true',
          'NumberOfKitchens': '1'
        },
        'MiniBar': 'false',
        'Terrace': 'false',
        'Barbacue': 'false',
        'Elevator': 'true',
        'FirePlace': 'false',
        'HairDryer': 'true',
        'NumOfFans': '0',
        'FencedPlot': 'false',
        'SecurityBox': 'false',
        'TVSatellite': {
          'Value': [],
          'LanguageDE': 'false',
          'LanguageDU': 'false',
          'LanguageEN': 'false',
          'LanguageES': 'false',
          'LanguageFR': 'false',
          'LanguageNO': [],
          'LanguageRU': [],
          'LanguageSV': []
        },
        'ChildrenArea': 'false',
        'JuiceSqueazer': 'true',
        'WindowScreens': 'NO',
        'ElectricKettle': 'true',
        'SmokingAllowed': 'false',
        'GardenFurniture': 'false',
        'NumOfTelevisions': '1',
        'HandicappedFacilities': [],
        'NumOfElectronicMosquitoRepeller': '0'
      },
      'extras': {
        'CommonServices': {
          'CommonService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '14082',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Comparison': [],
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '50'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '18',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '2',
              'AdditionalPrice': {
                'Unit': 'EURO-DIA',
                'Currency': 'EUR',
                'Quantity': '15'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '4549',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': '50000',
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '11',
              'AdditionalPrice': {
                'Unit': 'EURO-PERSONA-DIA',
                'Currency': 'EUR',
                'Quantity': '3.9'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2590',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '35'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '10',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'ULTIMO-PAGO',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '49'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '109',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OPCIONAL',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2431',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '10',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '2447',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'CountableLimit': '20',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '22'
              },
              'IncludedInPrice': 'false'
            }
          ]
        },
        'SpecialServices': {
          'SpecialService': [
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '8',
              'Type': 'wifi',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Comparison': '>',
              'Application': 'OBLIGATORIO-NOCHES-RESERVA',
              'CountableLimit': [],
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '40'
              },
              'ComparisonValue': '31',
              'IncludedInPrice': 'false'
            },
            {
              'Code': '2',
              'Type': 'si',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'ComparisonValue': [],
              'IncludedInPrice': 'true'
            },
            {
              'Code': '1',
              'Type': 'caldera-gas',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '11',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'PayTime': 'RESERVA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'PaymentMethod': [],
              'CountableLimit': [],
              'PaymentMethods': {
                'PaymentMethod': [
                  'TARJETA_RETENCION',
                  'TARJETA_GARANTIA'
                ]
              },
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '150'
              },
              'IncludedInPrice': 'false'
            },
            {
              'VAT': {
                'Included': 'true'
              },
              'Code': '9',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Allowed': 'si',
              'PayTime': 'LLEGADA',
              'MaxPrice': [],
              'MinPrice': [],
              'Countable': 'true',
              'Application': 'OPCIONAL',
              'LimitWeight': '0',
              'CountableLimit': '1',
              'AdditionalPrice': {
                'Unit': 'EURO-RESERVA',
                'Currency': 'EUR',
                'Quantity': '30'
              },
              'IncludedInPrice': 'false',
              'DangerousPetsAllowed': 'true'
            },
            {
              'Code': '6',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'CountableLimit': [],
              'IncludedInPrice': 'true',
              'ChangeBedClothes': 'false'
            },
            {
              'Code': '7',
              'Type': 'Suministrada',
              'Season': {
                'FinalDay': '31',
                'StartDay': '1',
                'FinalMonth': '12',
                'StartMonth': '1'
              },
              'Countable': 'false',
              'Application': 'OBLIGATORIO-SIEMPRE',
              'ChangeTowels': 'false',
              'CountableLimit': [],
              'IncludedInPrice': 'true'
            }
          ]
        }
      },
      'location_features': {
        'DegreesLength': '0',
        'FirstGolfLine': 'false',
        'LocationViews': {
          'ViewToGolf': 'false',
          'ViewToLake': 'false',
          'ViewToBeach': 'false',
          'ViewToRiver': 'false',
          'ViewToGarden': 'false',
          'ViewToMountain': 'false',
          'ViewToSwimmingPool': 'false'
        },
        'MinutesLength': '0',
        'SecondsLength': '0',
        'FirstBeachLine': 'false',
        'DegreesLatitude': '0',
        'LengthDirection': [],
        'MinutesLatitude': '0',
        'SecondsLatitude': '0',
        'LatitudeDirection': [],
        'LocationDistances': [],
        'LocationDescription': {
          'Howto': [],
          'Where': [],
          'Description1': [],
          'Description2': []
        }
      },
      'tricks': null,
      'inventory': null,
      'city': 'Madrid',
      'latlng': '40.4128483,-3.7083425',
      'coords': {
        'lat': 40.4128483,
        'lng': -3.7083425
      },
      'description': {
        'id': 20,
        'accommodation_id': 195039,
        'text': 'El <b>apartamento en Madrid<\/b> posee 2 dormitorio(s) y capacidad para 6 personas. <br>Alojamiento de 80 m². <br>Dispone de ascensor, plancha, acceso&nbsp;internet (wifi), secador, balcón, caldera individual de gas, aire&nbsp;acondicionado, 1 Televisor.<br>La cocina americana, de gas, está equipada con nevera, microondas, horno, congelador, lavadora, lavavajillas, vajilla\/cubertería, utensilios\/cocina, cafetera, tostadora, hervidor de agua y exprimidor.',
        'pictures': '[{"name":"A29I7122","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951331275036407fc0c70209ca237461c126ad.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951331275036407fc0c70209ca237461c126ad.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951331275036407fc0c70209ca237461c126ad.jpg","description":""},{"name":"A29I7127","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951334759ee31edfa215f725ec0a823806f881.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951334759ee31edfa215f725ec0a823806f881.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951334759ee31edfa215f725ec0a823806f881.jpg","description":""},{"name":"A29I7101","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951317ecb7d8d9fd904903cf0e5ce51487405c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951317ecb7d8d9fd904903cf0e5ce51487405c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951317ecb7d8d9fd904903cf0e5ce51487405c.jpg","description":""},{"name":"A29I7076","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th149995130872986c70fb2346dfdda5b6b3ebbfd2a4.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big149995130872986c70fb2346dfdda5b6b3ebbfd2a4.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/149995130872986c70fb2346dfdda5b6b3ebbfd2a4.jpg","description":""},{"name":"A29I7089","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999513143a54ec7a774fdb5bd41b1a8ec4743cc6.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999513143a54ec7a774fdb5bd41b1a8ec4743cc6.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999513143a54ec7a774fdb5bd41b1a8ec4743cc6.jpg","description":""},{"name":"A29I7044","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951280ce6ed87b7640b918485991e565647127.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951280ce6ed87b7640b918485991e565647127.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951280ce6ed87b7640b918485991e565647127.jpg","description":""},{"name":"A29I7047","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951289073ed9e9c9ad1a0e7d8ec7786e137b3e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951289073ed9e9c9ad1a0e7d8ec7786e137b3e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951289073ed9e9c9ad1a0e7d8ec7786e137b3e.jpg","description":""},{"name":"A29I7049","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951292f23ad643511669d205fd3d5d4a1b7897.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951292f23ad643511669d205fd3d5d4a1b7897.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951292f23ad643511669d205fd3d5d4a1b7897.jpg","description":""},{"name":"A29I7056","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951297ffeed7b5c9871a27eadb4e1f748a848b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951297ffeed7b5c9871a27eadb4e1f748a848b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951297ffeed7b5c9871a27eadb4e1f748a848b.jpg","description":""},{"name":"A29I7142","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951343f0ac5bc0f4f74cbd886b1f548d71165b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951343f0ac5bc0f4f74cbd886b1f548d71165b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951343f0ac5bc0f4f74cbd886b1f548d71165b.jpg","description":""},{"name":"A29I7151","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th15002973083c077a11630ccac7dc5f5598e8100577.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big15002973083c077a11630ccac7dc5f5598e8100577.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/15002973083c077a11630ccac7dc5f5598e8100577.jpg","description":""},{"name":"A29I7147","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951348248b7eeda6978f90135b26cd5f0178be.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951348248b7eeda6978f90135b26cd5f0178be.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951348248b7eeda6978f90135b26cd5f0178be.jpg","description":""},{"name":"A29I7153","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1500297311cca8202fb49ffe1c30b835ef93a9c101.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1500297311cca8202fb49ffe1c30b835ef93a9c101.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1500297311cca8202fb49ffe1c30b835ef93a9c101.jpg","description":""},{"name":"A29I7156","type":"BEDROOM","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1500297314e412f001b80f1fb4370e242f76151ee5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1500297314e412f001b80f1fb4370e242f76151ee5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1500297314e412f001b80f1fb4370e242f76151ee5.jpg","description":""},{"name":"A29I7086","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999513110a1678940f82e2a36c00597c9fd488d5.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999513110a1678940f82e2a36c00597c9fd488d5.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999513110a1678940f82e2a36c00597c9fd488d5.jpg","description":""},{"name":"A29I7107","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999512838345ea6f5f7b061f47c67a5ab060250c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999512838345ea6f5f7b061f47c67a5ab060250c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999512838345ea6f5f7b061f47c67a5ab060250c.jpg","description":""},{"name":"A29I7112","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999513195b88435e5107c23cce660763dd2c4794.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999513195b88435e5107c23cce660763dd2c4794.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999513195b88435e5107c23cce660763dd2c4794.jpg","description":""},{"name":"A29I7115","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951322f9dfc70dfc5e27ce6f3516c0666d3edb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951322f9dfc70dfc5e27ce6f3516c0666d3edb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951322f9dfc70dfc5e27ce6f3516c0666d3edb.jpg","description":""},{"name":"A29I7131","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951337579cf6b722e9ed180381d582065f2e50.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951337579cf6b722e9ed180381d582065f2e50.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951337579cf6b722e9ed180381d582065f2e50.jpg","description":""},{"name":"A29I7120","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999513283d6ce1195ba92698bd7ce2c8d32a95eb.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999513283d6ce1195ba92698bd7ce2c8d32a95eb.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999513283d6ce1195ba92698bd7ce2c8d32a95eb.jpg","description":""},{"name":"A29I7119","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951325f2e2977526720baf37946b1f9bd571ff.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951325f2e2977526720baf37946b1f9bd571ff.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951325f2e2977526720baf37946b1f9bd571ff.jpg","description":""},{"name":"A29I7065","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999513004f12dfcfa0f04345a794700300bafc1c.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999513004f12dfcfa0f04345a794700300bafc1c.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999513004f12dfcfa0f04345a794700300bafc1c.jpg","description":""},{"name":"A29I7069","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999513031aac291aeaa1ab9e357734234d68ddbe.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999513031aac291aeaa1ab9e357734234d68ddbe.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999513031aac291aeaa1ab9e357734234d68ddbe.jpg","description":""},{"name":"A29I7072","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th149995130637177fb373c292d5294612b626e75487.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big149995130637177fb373c292d5294612b626e75487.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/149995130637177fb373c292d5294612b626e75487.jpg","description":""},{"name":"A29I7143","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999513465442bd2b2a01d13b88cc1a2a86a6d93e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999513465442bd2b2a01d13b88cc1a2a86a6d93e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999513465442bd2b2a01d13b88cc1a2a86a6d93e.jpg","description":""},{"name":"A29I7053","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1499951295514ba0c526350d9fd268df81ab5a343e.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1499951295514ba0c526350d9fd268df81ab5a343e.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1499951295514ba0c526350d9fd268df81ab5a343e.jpg","description":""},{"name":"A29I7132","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th149995134059a3a5430bf5c6b9033a1d245605ba2f.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big149995134059a3a5430bf5c6b9033a1d245605ba2f.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/149995134059a3a5430bf5c6b9033a1d245605ba2f.jpg","description":""},{"name":"A29I7109","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th14999512878a04d7df76948237162007fadde64536.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big14999512878a04d7df76948237162007fadde64536.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/14999512878a04d7df76948237162007fadde64536.jpg","description":""},{"name":"A29I7165","type":"OTHERS","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1500297322089a7c9bbc3d694c03c937a29c52ebc3.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1500297322089a7c9bbc3d694c03c937a29c52ebc3.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1500297322089a7c9bbc3d694c03c937a29c52ebc3.jpg","description":""},{"name":"A29I7159","type":"EXTERIOR","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th150029731891e0fac89a4225905663b66b1913365d.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big150029731891e0fac89a4225905663b66b1913365d.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/150029731891e0fac89a4225905663b66b1913365d.jpg","description":""},{"name":"A29I7167","type":"EXTERIOR","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1500297325a67e7b7d7832d66f856ac2429ac2fbd7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1500297325a67e7b7d7832d66f856ac2429ac2fbd7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1500297325a67e7b7d7832d66f856ac2429ac2fbd7.jpg","description":""},{"name":"A29I7170","type":"EXTERIOR","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th150029732848415ae6d4131e740bb538234bb87dfd.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big150029732848415ae6d4131e740bb538234bb87dfd.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/150029732848415ae6d4131e740bb538234bb87dfd.jpg","description":""},{"name":"A29I7174","type":"EXTERIOR","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1500297330408a32ab2c1d14b0fe912c2a25b0d01b.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1500297330408a32ab2c1d14b0fe912c2a25b0d01b.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1500297330408a32ab2c1d14b0fe912c2a25b0d01b.jpg","description":""},{"name":"A29I7180","type":"EXTERIOR","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th150029733370e8ed79244c02c3b5d6a6ca868c3cb7.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big150029733370e8ed79244c02c3b5d6a6ca868c3cb7.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/150029733370e8ed79244c02c3b5d6a6ca868c3cb7.jpg","description":""},{"name":"A29I7185","type":"FRONT","thumbnail":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/th1500297336fed620c28e6daa0481450ad3a46634db.jpg","adapted":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/big1500297336fed620c28e6daa0481450ad3a46634db.jpg","original":"http:\\\/\\\/img.crs.itsolutions.es\\\/fotos\\\/2\\\/1496749594da0a9dbfd10251c2468308c3f572d15d\\\/1500297336fed620c28e6daa0481450ad3a46634db.jpg","description":""}]',
        'booking_url': 'http:\/\/book.alterhome.es\/alquiler\/reservar-apartamento-madrid-plaza-mayor-W1502BCPZREDNA195039IES.html'
      },
      'binnacle': [
        {
          'id': 2586,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 195039,
          'user_id': 16,
          'created_at': '2019-05-23 10:13:50',
          'updated_at': '2019-05-23 10:13:50',
          'title': 'Update',
          'message': 'The accommodation 195039 was updated.'
        },
        {
          'id': 3533,
          'target_type': 'Accommodation',
          'action': 'update',
          'target_id': 195039,
          'user_id': 16,
          'created_at': '2019-06-26 12:47:02',
          'updated_at': '2019-06-26 12:47:02',
          'title': 'Update',
          'message': 'The accommodation 195039 was updated.'
        }
      ],
      'host': {
        'id': 51,
        'names': 'María Cristina',
        'last_names': 'Villén Sotomayor',
        'email': 'migodar@gmail.com',
        'identification': '30562809H',
        'phone': '638 278 556',
        'birthday': '2019-01-16',
        'created_at': '2019-03-22 13:23:35',
        'updated_at': '2019-03-22 13:23:35'
      },
      'comments': [],
      'custom_data': [
        {
          'id': 13,
          'target_type': 'Accommodation',
          'target_id': 195039,
          'data': {
            'Rent': 'RV',
            'Licencia': '["\\\/storage\\\/Accommodation-___custom:Licencia-1561553222.pdf"]',
            'Escritura': '["\\\/storage\\\/Accommodation-___custom:Escritura-1561553222.pdf","\\\/storage\\\/Accommodation-___custom:Escritura-1561553222.pdf"]',
            'Dirección': 'Grafal Nº 7, 3º A',
            'Inventario': 'Si',
            'Contrato fisico': null,
            'Nombre del wifi': null,
            'Contrato Digital': null,
            'Póliza de seguro': null,
            'Inicio de contrato': null,
            'Manual House rules': null,
            'Compania telefonica': null,
            'Fotos Profecionales': null,
            'Contraseña del WIFI': null,
            'Referencia catastral': null,
            'Comisión de la renta': null,
            'Decoración contratada': null,
            'Cédula de habitabilidad': null,
            'Finalizacion  de contrato': null
          },
          'created_at': '2019-06-26 12:47:02',
          'updated_at': '2019-07-24 23:50:37'
        }
      ]
    }
  ];

  nowCookies = moment().add(15, 'days').toDate();
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;


  constructor(private rest: RestService, private util: UtilsService, public bsModalRef: BsModalRef,
              private cookieService: CookieService) {

  }

  emitPreview = (a) => {

    a['zip_code'] = a['id'];

    this.util.getLocation.emit({
      zip_code: [a],
      customer_lat: a['coords']['lat'],
      customer_lng: a['coords']['lng']
    });

    const _b = JSON.stringify({
      name: a['name'],
      zip_code: a['id']
    });
    console.log('json---', _b);
    this.cookieService.set(
      '_location_zip_code',
      _b,
      this.nowCookies,
      '/');
    this.bsModalRef.hide();
  };
  getZipCode = (data) => new Promise((resolve, reject) => {
    if (data && (typeof data) === 'object') {
      const res = data.find(b => b.types[0] === 'postal_code');
      if (res) {
        resolve(res['short_name']);
      } else {
        reject(new Error('Not valid address object'));
      }
    } else {
      reject(new Error('Not valid address object'));
    }
  });

  public handleAddressChange(address: Address) {
    this.coordenades['lat'] = address.geometry.location.lat();
    this.coordenades['lng'] = address.geometry.location.lng();

    this.getZipCode(address['address_components'])
      .then(zip_code => {
        this.zip_code = zip_code;
        this.checkZip(zip_code);
      }).catch(error => {
      this.address = '';
      this.msg = 'Not found';
    });
  }

  public checkZip = (zip_code) => {
    this.loading = true;
    this.rest.get(`/rest/zone-available?src=${zip_code}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          response = response['data'];
          this.data = response['data'];
          if (this.data.length) {
            this.buttonAvailable = true;
            const _cookie_data = (this.data[0] && JSON.stringify(this.data[0])) ?
              JSON.stringify(this.data[0]) : null;
            this.cookieService.set(
              '_location_zip_code',
              _cookie_data,
              this.nowCookies,
              '/');
            this.cookieService.set(
              'customer_lat',
              this.coordenades['lat'],
              this.nowCookies,
              '/');
            this.cookieService.set(
              'customer_lng',
              this.coordenades['lng'],
              this.nowCookies,
              '/');
            this.util.getLocation.emit({
              zip_code: this.data,
              customer_lat: this.coordenades['lat'],
              customer_lng: this.coordenades['lng']
            });
            this.bsModalRef.hide();
          } else {
            this.address = '';
            this.msg = 'Not available';
          }
        }
      });
  };


  ngOnInit() {

  }

}
