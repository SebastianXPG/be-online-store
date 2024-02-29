import { User } from '../../../entities/user.entity';
import { UserDto } from '../dto/users-dto';

export function mapUserEntityToDto(entity: User): UserDto {
  const dto: UserDto = new UserDto();
  dto.id = entity.idUser;
  dto.name = entity.name;
  dto.email = entity.email;
  dto.phone = entity.phone;
  dto.identification = entity.identification;
  dto.rol = entity.role;

  return dto;
}

export function mapUserDtoToEntity(dto: UserDto): User {
  const entity: User = new User();
  entity.idUser = dto.id;
  entity.name = dto.name;
  entity.email = dto.email;
  entity.phone = dto.phone;
  entity.identification = dto.identification;
  entity.role = dto.rol;

  return entity;
}
