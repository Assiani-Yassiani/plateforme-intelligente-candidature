package com.alibou.security.respense;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatusRespense {
    private  Integer id;
    private String status;
    private String date;
    private String horaire;
    private  String meet;
    private   Integer idcondidature;

}
