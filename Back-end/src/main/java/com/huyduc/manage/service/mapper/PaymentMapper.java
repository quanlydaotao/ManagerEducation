package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Payment;
import com.huyduc.manage.service.dto.PaymentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper for the entity Payment and its DTO called PaymentDTO.
 */
@Mapper(componentModel = "spring", uses = {TuitionMapper.class})
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {
    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    @Mapping(source = "tuition.id", target = "tuitionId")
    PaymentDTO toDto(Payment payment);

    List<PaymentDTO> toDto(List<Payment> payments);

    @Mapping(source = "tuitionId", target = "tuition")
    Payment toEntity(PaymentDTO tuitionDTO);

    List<Payment> toEntity(List<PaymentDTO> paymentDTOS);

    default Payment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Payment payment = new Payment();
        payment.setId(id);
        return payment;
    }
}
